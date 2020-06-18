import jwt from 'jsonwebtoken';
import db from '../models';
import { config } from 'dotenv';

config();

export const authenticate = async (req, res, next) => {
  try {
    const token = req
      .header('Authorization')
      .replace('Bearer', '')
      .trim();

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user = await db.users.findOne({ where: { id: decoded.id } });
    if (!user) return res.status(400).json({ status: false, message: "User doesn't exist!" });
    req.token = token;
    req.user = user;
    return next();

  } catch (error) {
    return res.status(400).json({ status: false, message: 'Invalid Token' });
  }
}
