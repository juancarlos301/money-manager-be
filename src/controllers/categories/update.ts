import { RequestHandler } from 'express';

import { Category } from '../../database/models';
import { chPerm, decodeJWT } from '../../helpers';

export const updateCategory: RequestHandler = async (req, res) => {
  try {
    const decoded = decodeJWT(req);
    if (!chPerm(['admin'], decoded)) {
      return res.status(400).json({
        success: false,
        message: "You don't have permission to view clients",
      });
    }

    const { name, icon, deleted, id, purpuse } = req.body;

    if (!name || !icon || !id || !purpuse) {
      return res.status(400).send({
        message: 'Please pass name, purpuse, icon and id .',
        body: req.body,
      });
    }

    Category.update(
      {
        name,
        icon,
        purpuse,
        deleted: !!deleted,
      },
      { where: { id } }
    )
      .then((category) => res.status(201).send({ success: true, data: { category } }))
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
