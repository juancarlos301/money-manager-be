import { RequestHandler } from 'express';
import { Op } from 'sequelize';
import nodemailer from 'nodemailer';

import { User } from '../../database/models';

export const sendEmail: RequestHandler = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({
      where: {
        email: email,
        deleted: { [Op.not]: true },
      },
      raw: true,
    });

    if (!user) {
      return res.status(400).send({
        success: false,
        data: {
          message: 'Authentication failed. User not found.',
        },
      });
    }

    const newPassword = generateRandomPassword(12);

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
      .then(async (user) => {
        const response = await sendMessageToEmail(email, newPassword);
        return res.status(201).send(response);
      })
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

const generateRandomPassword = (length: number) => {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+';

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomCharacter = caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    password += randomCharacter;
  }

  return password;
};

const sendMessageToEmail = async (email: string, newPassword: string) => {
  try {
    const transporter = nodemailer.createTransport({
      port: 465,
      secure: true,
      auth: {
        user: process.env.nodemailer_user,
        pass: process.env.nodemailer_password,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.nodemailer_user,
      to: email,
      subject: 'Hello, restore password ✔',
      text: 'Restore password Money Manager',
      html: `<div><h2>This is your new restore code:</h2><h4>${newPassword}</h4></div>`,
    });

    return { success: true, data: { message: `Message sent: ${info.messageId}` } };
  } catch (error) {
    console.log(error);
    return { success: false, data: { message: "We couldn't send the email." } };
  }
};
