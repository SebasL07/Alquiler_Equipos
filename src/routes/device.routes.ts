import { Router } from 'express';
import { deviceController } from '../controllers';
import { validateSchema } from '../middleware';
import { deviceSchema } from '../schemas';

export const deviceRouter = Router();

deviceRouter.get('/', deviceController.getDevices);
deviceRouter.get('/:id', deviceController.getDevice);
deviceRouter.post('/', validateSchema(deviceSchema), deviceController.postDevice);
deviceRouter.put('/:id', deviceController.putDevice);
deviceRouter.delete('/:id', deviceController.deleteDevice);
deviceRouter.delete('/', deviceController.deleteAllDevices);


