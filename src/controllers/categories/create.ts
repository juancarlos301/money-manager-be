import { RequestHandler } from 'express';
import { Category } from '../../database/models';

export const createCategory: RequestHandler = (req, res) => {
  try {
    const { name, icon, purpuse } = req.body;

    if (!name || !icon || !purpuse) {
      return res.status(400).send({
        message: 'Please pass name, purpuse and icon .',
        body: req.body,
      });
    }
    Category.create({
      name,
      icon,
      purpuse,
      deleted: false,
    })
      .then((category) => res.status(201).send({ success: true, data: { category } }))
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
