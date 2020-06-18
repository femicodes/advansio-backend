import { Router } from 'express';
import { register, login } from '../controllers/auth';
import { validator } from '../utils';
import { registerSchema, loginSchema } from './schema';

const authRoute = Router();

authRoute.post('/register', validator.body(registerSchema), register);
authRoute.post('/login', validator.body(loginSchema), login);

export default authRoute;
