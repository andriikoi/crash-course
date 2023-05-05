import { Router } from 'express';
import userController from '../controllers/user.controller';
import verifyJwt from '../middlewares/verifyJwt';

const userRouter = Router();

userRouter.post('/signin', userController.login);
userRouter.post('/signup', userController.register);

userRouter.patch('/update-me', [verifyJwt, userController.updateMe]);

userRouter.get('/me', [verifyJwt, userController.getMe]);

userRouter.delete('/:id', [verifyJwt, userController.delete]);

export default userRouter;
