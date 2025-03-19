import { Router } from "express";
import { userController } from "../controllers";

export const userRouter = Router();   

userRouter.get('/', userController.getUsers);
userRouter.get('/:id', userController.getUser);
userRouter.post('/', userController.postUsers);
userRouter.put('/:email', userController.putUserByEmail);
userRouter.delete('/:email', userController.deleteUsers);




