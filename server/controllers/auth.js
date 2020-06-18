import db from '../models';
import { generateToken, hashPassword, comparePassword } from '../utils/auth';

const { users } = db;

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const checkUser = await users.findOne({ where: { email } });

    if (checkUser) return res.status(400).json({
      status: false,
      message: 'Email already exists'
    });

    const newUser = await users.create({
      name,
      email,
      password: hashPassword(password)
    });

    const token = generateToken(newUser.email, newUser.id);
    return res.status(201).json({ status: true, token });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkUser = await users.findOne({ where: { email } });
    if (!checkUser) return res.status(404).json({ status: false, message: 'User not found' });

    const checkPassword = comparePassword(password, checkUser.password);
    if (!checkPassword) return res.status(400).json({ status: false, message: 'Email or password incorrect' });

    const token = generateToken(checkUser.email, checkUser.id);
    const user = {
      name: checkUser.name,
      email: checkUser.email,
    };

    return res.status(200).json({ status: true, token, user });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
}
