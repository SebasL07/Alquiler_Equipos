import User from '../models/user.model';

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

    public async createUser(userData: any) {
        const existEmail = await User.findOne({ where: { email: userData.email } });
        if (existEmail) throw new Error('Email already exists');
        return await User.create(userData);
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
}

export const userService = new UserService();
