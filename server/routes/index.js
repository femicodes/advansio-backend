import { Router } from 'express';
import authRoute from './auth';
import commentRoute from './comment';

const router = Router();

router.use('/', authRoute);
router.use('/', commentRoute);

export default router;
