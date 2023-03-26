import { Router } from 'express';
import healthCheckController from '../controllers/healthcheck.controller';

const router = Router();

router.get('/', healthCheckController.check);

export default router;
