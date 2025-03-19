import { Request, Response } from 'express';
import User from '../models/user';

class UserController{

}

export const getUsers = async(req: Request, res: Response) => {
    try{

    
        const users = await User.findAll();
        
        if(users.length === 0){
            res.status(404).json({
                msg: 'No users found'
            });
        }else{
        res.json(users);
        }
    }catch(error: any){
        res.status(500).json({
            msg: 'Server error'
        });
    }
}


export const getUser =  async(req: Request, res: Response) => {
    const { id } = req.params;
    try{

    const user = await User.findByPk(id);
    
    
        if(user){
            res.json(user);
        }else{
            res.status(404).json({
                msg: `User with id ${id} not found`
            });
        }
    }catch(error: any){
        res.status(500).json({
            msg: 'Server error'
        });
    }

}


export const postUsers = async (req: Request, res: Response): Promise<Response | undefined> => {
    const { body } = req;
    try {
        const existEmail = await User.findOne({
            where: {
                email: body.email
            }
        });
       if(existEmail){
           return res.status(400).json({
               msg: 'Email already exists'
           });
       }
       const user = await User.create({
        name: body.name,
        email: body.email,
        password: body.password,
        cellphone: body.cellphone,
        adress: body.adress

       });

       await(await user).save();
       res.status(200).json({msg: 'User created'});


    }
    catch (error: any) {
        res.status(500).json({
            msg: 'Error server'
        });
    }

}

export const putUserByEmail = async (req: Request, res: Response) => {
    const { email } = req.params; 
    const { body } = req;

    try {
        const user = await User.findOne({ where: { email } }); 

        if (user) {
            await user.update(body);
            res.status(200).json({
                msg: 'User updated'
            });
        } else {
            res.status(404).json({
                msg: `User with email ${email} not found`
            });
        }
    } catch (error: any) {
        res.status(500).json({
            msg: 'Server error'
        });
    }
};


export const deleteUsers = async (req: Request, res: Response) => {    
    const { email } = req.params;

    try{
        const user = await User.findOne({where: {email}});
        if(user){
            await user.destroy();
            res.status(200).json({
                msg: 'User deleted'
            });

        }else{
            res.status(404).json({
                msg: `User with email ${email} not found`
            });
        }

    }catch(error: any){
        res.status(500).json({
            msg: 'Server error'
        });
    }
    

    

}
