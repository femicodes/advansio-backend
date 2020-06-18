import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

export const hashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const comparePassword = (password, hashedPassword) => bcrypt.compareSync(password, hashedPassword);

export const generateToken = (email, id) =>
  jwt.sign({ id, email }, process.env.SECRET_KEY, { expiresIn: '70d' });
