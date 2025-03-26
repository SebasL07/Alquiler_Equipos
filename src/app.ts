import dotenv from 'dotenv';
import {Server} from "./models/server";

dotenv.config();

const server = new Server();

const app = server.getApp();

server.listen();

export {app};
