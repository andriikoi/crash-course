import { Router } from 'express';
import authController from '../controllers/user.controller';
import verifyJwt from '../middlewares/verifyJwt';

const userRouter = Router();

userRouter.post('/signin', authController.login);
userRouter.post('/signup', authController.register);

userRouter.delete('/:id', [verifyJwt, authController.delete]);

export default userRouter;
