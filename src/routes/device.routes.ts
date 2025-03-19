import { Router } from 'express';
import { deviceController } from '../controllers';

export const deviceRouter = Router();

deviceRouter.get('/', deviceController.getDevices);
deviceRouter.get('/:id', deviceController.getDevice);
deviceRouter.post('/', deviceController.postDevice);
deviceRouter.put('/:id', deviceController.putDevice);
deviceRouter.delete('/:id', deviceController.deleteDevice);


