import { RequestHandler } from 'express';
import { Op, WhereOptions } from 'sequelize';
import dayjs from 'dayjs';

import { chPerm, decodeJWT } from '../../helpers';
import { Register } from '../../database/models';
import { RegisterType } from '../../types';

export const getAllExpenses: RequestHandler = async (req, res) => {
  try {
    const decoded = decodeJWT(req);
    if (!chPerm(['admin'], decoded)) {
      return res.status(400).json({
        success: false,
        message: "You don't have permission to view clients",
      });
    }
    let { start_date, end_date, category } = req.body;

    let filter: WhereOptions<RegisterType> = { deleted: false, purpose: 'expenses' };

    if (category) filter.category = category;

    if (start_date && end_date) {
      const startDate = dayjs(start_date).startOf('day');
      const endDate = dayjs(end_date).endOf('day');

      filter.createdAt = {
        [Op.between]: [startDate.toDate(), endDate.toDate()],
      };
    }

    const expenses = await Register.findAll({
      where: filter,
    });
    return res.status(200).json({ success: true, data: { expenses } });
  } catch (err) {
    return res.status(500);
  }
};
