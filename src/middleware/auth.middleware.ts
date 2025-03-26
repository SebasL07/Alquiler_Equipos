import { Request, Response, NextFunction } from 'express';
import jwt, { TokenExpiredError } from 'jsonwebtoken';

export const auth = (req: Request, res: Response, next: NextFunction) => {
    let token : string | undefined = req.header('x-auth-token');

    if (!token) {
        res.status(401).json({ msg: 'No token, authorization denied' });
        return;
    }

    try{
        token = token.replace('Bearer ', '');
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        req.body.loggedUser = decoded;
        console.log(decoded);
        req.params.id = decoded.user.id;
        next();
    }catch(error: any){
        if (error instanceof TokenExpiredError) {
            res.status(401).json({ msg: 'Token expired' });
            return; 
        }
        res.status(401).json({ msg: 'Token is not valid' });

    }
}