import { Router } from "express";
import { userController } from "../controllers";
import { validateSchema } from "../middleware";
import { userSchema } from "../schemas";

export const userRouter = Router();   

userRouter.get('/', userController.getUsers);
userRouter.get('/:id', userController.getUser);
userRouter.post('/', validateSchema(userSchema), userController.postUsers);
userRouter.put('/:email', userController.putUserByEmail);
userRouter.delete('/:email', userController.deleteUsers);
userRouter.post('/login', userController.logIn);




