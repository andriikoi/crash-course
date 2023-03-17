import { Router } from 'express';
import healthCheckController from '../controllers/healthcheck.controller';

const router = Router();

router.use('/', healthCheckController.check);

export default router;
