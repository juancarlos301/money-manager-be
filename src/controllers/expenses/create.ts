import { RequestHandler } from 'express';
import { Register } from '../../database/models';

export const createExpense: RequestHandler = (req, res) => {
  try {
    const { category, value } = req.body;

    if (!category || !value) {
      return res.status(400).send({
        message: 'Please pass category and value .',
        body: req.body,
      });
    }
    Register.create({
      category,
      value,
      purpuse: 'expenses',
      deleted: false,
    })
      .then((register) => res.status(201).send({ success: true, data: { expense: register } }))
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
    });
  }
};
