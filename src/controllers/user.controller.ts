import { Request, Response } from 'express';
import { userService } from '../services/user.service'; 
import { AuthException } from '../exceptions';
import { UserLogin } from '../interfaces';

class UserController {
    public async getUsers(req: Request, res: Response) {
        try {
            const users = await userService.getAllUsers();
            if (users.length === 0) {
                res.status(404).json({ msg: 'No users found' });
            } else {
                res.status(200).json(users);
            }
        } catch (error: any) {
            res.status(500).json({ msg: error.message });
        }
    }

    public async getUser(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const user = await userService.getUserById(id);
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ msg: `User with id ${id} not found` });
            }
        } catch (error: any) {
            res.status(500).json({ msg: error.message });
        }
    }

    public async postUsers(req: Request, res: Response) {
        try {
            await userService.createUser(req.body);
            res.status(201).json({ msg: 'User created' });
        } catch (error: any) {
            res.status(400).json({ msg: error.message });
        }
    }

    public async putUserByEmail(req: Request, res: Response) {
        const { email } = req.params;
        try {
            await userService.updateUserByEmail(email, req.body);
            res.status(200).json({ msg: 'User updated' });
        } catch (error: any) {
            res.status(404).json({ msg: error.message });
        }
    }

    public async deleteUsers(req: Request, res: Response) {
        const { email } = req.params;
        try {
            await userService.deleteUserByEmail(email);
            res.status(204).json({ msg: 'User deleted' });
        } catch (error: any) {
            res.status(404).json({ msg: error.message });
        }
    }

    public async logIn(req: Request, res: Response) {
        try {
            const user = await userService.logIn(req.body as UserLogin);
            res.status(200).json(user);
        } catch (error: any) {
            if(error instanceof AuthException) {
                res.status(401).json({ msg: error.message });
                return;
            };
            res.status(500).json({ msg: 'Server error' });
        }
    }
}

export const userController = new UserController();
