import { Router } from 'express';
import UserController from './UserController';
import UserValidator from '../../middleware/UserValidator';

const userRouter = Router();

userRouter.get('', UserController.getAllUserRecords);

userRouter.post(
  '',
  UserValidator.validateCreateUser,
  UserController.getAllUserRecords
);

userRouter.post(
  '/register',
  UserValidator.validateCreateUser,
  UserController.registerUser
);

userRouter.post('/confirmation/:token', UserController.confirmEmail);

userRouter.post(
  '/login',
  UserValidator.validateUserLogin,
  UserController.loginUser
);

export default userRouter;
