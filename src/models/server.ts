import express, {Application} from "express";
import {userRouter, deviceRouter, requestRouter} from "../routes";
import cors from "cors";
import db from "../database/connect";

export class Server{

    private app: Application;
    private port:string;
    private apiRoutes = {
        users: '/api/users',
        devices: '/api/devices',
        requests: '/api/requests'
    };
    
    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000';
        this.dbConnect();
        this.middlewares();
        this.routes();

    }

    async dbConnect(){
        try {
            await db.authenticate();
            console.log('Database online');
        } catch (error: any) {
            throw new Error(error);
        }
    }

    middlewares(){
        // trabajar con cors domain
        this.app.use(express.json());
        // lectura de body
        this.app.use(cors());
        // carpeta publica
        this.app.use(express.static('public'));
    
    }


    routes(){
        this.app.use(this.apiRoutes.users, userRouter);
        this.app.use(this.apiRoutes.devices, deviceRouter);
        this.app.use(this.apiRoutes.requests, requestRouter);

    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Server running on port ' + this.port);
        }
        );
    }
    
}