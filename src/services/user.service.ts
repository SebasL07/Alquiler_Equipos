import { UserInput, UserLogInResponse } from '../interfaces';
import { AuthException } from '../exceptions';
import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UserService {
    public async getAllUsers() {
        return await User.findAll();
    }

    public async getUserById(id: string) {
        return await User.findByPk(id);
    }

    public async getUserByEmail(email: string) {
        return await User.findOne({ where: { email } });
    }

    public async createUser(userInput : UserInput) {
        const existEmail = await User.findOne({ where: { email: userInput.email } });
        if (existEmail) throw new Error('Email already exists');

        if (userInput.password){
            userInput.password = await bcrypt.hash(userInput.password, 10);
        }
        
        return await User.create(userInput as any);
    }

    public async updateUserByEmail(email: string, userData: any) {
        const user = await User.findOne({ where: { email } });
        if (!user) throw new Error(`User with email ${email} not found`);
        await user.update(userData);
        return user;
    }

    public async deleteUserByEmail(email: string) {
        const user = await User.findOne({ where: { email } });
        if (!user) throw new Error(`User with email ${email} not found`);
        await user.destroy();
    }

    public async logIn(email: string, password: string) : Promise< UserLogInResponse | null> {

        try {
            const user = await User.findOne({ where: { email } });
            if (!user) throw new Error(`User with email ${email} not found`);
            const isPasswordValid = await bcrypt.compare(password, user.get('password') as string);
            if (!isPasswordValid) throw new AuthException('Invalid password');
            return {
                user: {
                    name: user.get('name') as string,
                    email: user.get('email') as string,
                    cellphone: user.get('cellphone') as number,
                    adress: user.get('adress') as string,
                    token: await this.generateToken(email),
                    role: user.get('role') as string
                }
            }
        } catch (error) {
            throw error;
        }
    }

    public async generateToken(email: string) : Promise<string> {
        const user = await User.findOne({ where: { email } });
        if (!user) throw new Error(`User with email ${email} not found`);
        try {
            return jwt.sign({
                user : {
                    id : user.get('id'),
                    email : user.get('email'),
                    name : user.get('name'),
                    role : user.get('role')
                }
            }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
        } catch (error) {
            throw error;
        }
    }

}

export const userService = new UserService();
