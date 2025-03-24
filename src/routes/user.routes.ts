import { Router } from "express";
import { userController } from "../controllers";

export const userRouter = Router();   

userRouter.get('/users', userController.getUsers);
userRouter.get('/:id', userController.getUser);
userRouter.post('/users', userController.postUsers);
userRouter.put('/:email', userController.putUserByEmail);
userRouter.delete('/:email', userController.deleteUsers);
userRouter.post('/login', userController.logIn);




