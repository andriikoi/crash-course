import { Router } from 'express';
import healthcheckRouter from './healthcheck.routes';
import userRouter from './user.routes';

const rootRouter = Router();

rootRouter.use('/users', userRouter);
rootRouter.use('/healthcheck', healthcheckRouter);

export default rootRouter;
