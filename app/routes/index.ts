import { Router } from 'express';
import healthcheckRouter from './healthcheck.routes';

const rootRouter = Router();

rootRouter.use('/healthcheck', healthcheckRouter);

export default rootRouter;
