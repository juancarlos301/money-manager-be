import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';
import { Op } from 'sequelize';
import bcrypt from 'bcrypt-nodejs';

import { User } from '../../database/models';

export const restorePassword: RequestHandler = async (req, res) => {
  try {
    const { newPassword, restoreCode, email } = req.body;

    const user = await User.findOne({
      where: {
        email: email,
        deleted: { [Op.not]: true },
      },
    });

    if (!user) {
      return res.status(400).send({
        success: false,
        data: {
          message: 'Authentication failed. User not found.',
        },
      });
    }
    let isMatch = false;

    bcrypt.compare(restoreCode, user.password, (err, isMatch) => {
      if (isMatch && !err) {
        isMatch = true;
      }
    });

    if (!isMatch) {
      return res.status(400).send({
        success: false,
        data: {
          message: 'Authentication failed. Wrong password.',
        },
      });
    }

    User.update(
      {
        email: user.email,
        password: newPassword,
        role: user.role,
        name: user.name,
        deleted: false,
      },
      {
        where: { id: user.id },
      }
    )
      .then((user) => res.status(201).send({ sucess: true, data: { user } }))
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
