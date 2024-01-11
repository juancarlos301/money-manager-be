import { RequestHandler } from 'express';
import { Op, WhereOptions } from 'sequelize';
import dayjs from 'dayjs';

import { chPerm, decodeJWT, rawFindAll } from '../../helpers';
import { Register } from '../../database/models';
import { RegisterType } from '../../types';

export const getBalance: RequestHandler = async (req, res) => {
  try {
    const decoded = decodeJWT(req);
    if (!chPerm(['admin'], decoded)) {
      return res.status(400).json({
        success: false,
        message: "You don't have permission to view clients",
      });
    }
    let { start_date, end_date } = req.body;

    let filter: WhereOptions<RegisterType> = { deleted: false };

    if (start_date && end_date) {
      const startDate = dayjs(start_date).startOf('day');
      const endDate = dayjs(end_date).endOf('day');

      filter.createdAt = {
        [Op.between]: [startDate.toDate(), endDate.toDate()],
      };
    }

    const registers = await Register.findAll({
      where: filter,
    });

    let totalExpenses = 0;
    let totalIncomes = 0;
    let balance = 0;
    const expenses = [];
    const incomes = [];

    const data = rawFindAll(registers) as Register[];

    for (let register of data) {
      if (register.purpose === 'expenses') {
        totalExpenses += register.value;
        expenses.push(register);
        balance += register.value;
      } else {
        totalIncomes += register.value;
        incomes.push(register);
        balance -= register.value;
      }
    }

    return res
      .status(200)
      .json({ success: true, data: { totalExpenses, totalIncomes, balance, incomes, expenses } });
  } catch (err) {
    return res.status(500);
  }
};
