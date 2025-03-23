import { Request, Response } from 'express';
import { userService } from '../services'; 

class UserController {
    public async getUsers(req: Request, res: Response) {
        try {
            const users = await userService.getAllUsers();
            if (users.length === 0) {
                res.status(404).json({ msg: 'No users found' });
            } else {
                res.json(users);
            }
        } catch (error: any) {
            res.status(500).json({ msg: 'Server error' });
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
            res.status(500).json({ msg: 'Server error' });
        }
    }

    public async postUsers(req: Request, res: Response) {
        try {
            await userService.createUser(req.body);
            res.status(200).json({ msg: 'User created' });
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
            res.status(200).json({ msg: 'User deleted' });
        } catch (error: any) {
            res.status(404).json({ msg: error.message });
        }
    }
}

export const userController = new UserController();
