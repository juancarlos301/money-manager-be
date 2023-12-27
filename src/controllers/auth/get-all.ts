import { RequestHandler } from 'express';
import Sequelize, { Op, WhereOptions } from 'sequelize';
import { chPerm, decodeJWT } from '../../helpers';

import { User } from '../../database/models';
import { UserType } from '../../types';

export const getAllUsers: RequestHandler = async (req, res) => {
  try {
    let { keyword, role } = req.body;

    const decoded = decodeJWT(req);
    if (!chPerm(['admin'], decoded)) {
      return res.status(400).json({
        success: false,
        message: "You don't have permission to view clients",
      });
    }

    let filter = {} as WhereOptions & UserType;
    if (keyword) {
      filter = {
        ...filter,
        [Op.or]: [
          Sequelize.where(Sequelize.fn('unaccent', Sequelize.col('name')), {
            [Op.iLike]: `%${keyword}%`,
          }),
          Sequelize.where(Sequelize.fn('unaccent', Sequelize.col('email')), {
            [Op.iLike]: `%${keyword}%`,
          }),
        ],
      };
    }

    if (role) filter.role = role;

    const users = await User.findAll({
      where: filter,
    });
    return res.status(200).json({ sucess: true, data: { users } });
  } catch (err) {
    return res.status(500);
  }
};
