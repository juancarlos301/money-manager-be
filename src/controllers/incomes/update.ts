import { RequestHandler } from 'express';

import { Register } from '../../database/models';
import { chPerm, decodeJWT } from '../../helpers';

export const updateIncome: RequestHandler = async (req, res) => {
  try {
    const decoded = decodeJWT(req);
    if (!chPerm(['admin'], decoded)) {
      return res.status(400).json({
        success: false,
        message: "You don't have permission to view clients",
      });
    }

    const { category, value, deleted, id } = req.body;

    if (!category || !value || !id) {
      return res.status(400).send({
        message: 'Please pass category, value and id.',
        body: req.body,
      });
    }

    Register.update(
      {
        category,
        value,
        purpuse: 'incomes',
        deleted: !!deleted,
      },
      { where: { id } }
    )
      .then((register) => res.status(201).send({ success: true, data: { income: register } }))
      .catch((error: Error) => {
        console.log(error);
        res.status(400).send({ success: false, data: { message: error } });
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
    });
  }
};
