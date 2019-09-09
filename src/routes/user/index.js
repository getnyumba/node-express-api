import { Router } from "express";
import UserController from "./UserController";

const userRouter = Router();

userRouter.get(
    "",
    UserController.getAllUserRecords,
);

export default userRouter;
