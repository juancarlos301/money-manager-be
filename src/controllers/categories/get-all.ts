import { RequestHandler } from 'express';
import { WhereOptions } from 'sequelize';

import { chPerm, decodeJWT } from '../../helpers';
import { Category } from '../../database/models';
import { CategoryType } from '../../types';

export const getAllCategories: RequestHandler = async (req, res) => {
  try {
    const decoded = decodeJWT(req);
    if (!chPerm(['admin'], decoded)) {
      return res.status(400).json({
        success: false,
        message: "You don't have permission to view clients",
      });
    }
    let { purpose } = req.body;

    let filter: WhereOptions<CategoryType> = { deleted: false };

    if (purpose) filter.purpose = purpose;

    const categories = await Category.findAll({
      where: filter,
    });
    return res.status(200).json({ success: true, data: { categories } });
  } catch (err) {
    return res.status(500);
  }
};
