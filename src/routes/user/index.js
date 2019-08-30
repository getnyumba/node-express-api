import { Router } from 'express';
import UserController from './UserController';
import { UserValidator } from '../../middleware';

const userRouter = Router();

userRouter.post(
    '',
    UserValidator.validateCreateUser,
    UserController.getAllUserRecords
);

export default userRouter;