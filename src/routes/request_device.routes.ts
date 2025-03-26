import { Router } from "express";
import { requestDeviceController } from "../controllers";
import { validateSchema } from "../middleware";
import { requestDeviceSchema } from "../schemas";

export const requestDeviceRouter = Router();

requestDeviceRouter.get('/', requestDeviceController.getRequestDevices);
requestDeviceRouter.get('/:id', requestDeviceController.getRequestDevice);
requestDeviceRouter.post('/', validateSchema(requestDeviceSchema), requestDeviceController.postRequestDevice);
requestDeviceRouter.put('/:id', requestDeviceController.putRequestDevice);
requestDeviceRouter.delete('/:id', requestDeviceController.deleteRequestDevice);
requestDeviceRouter.delete('/', requestDeviceController.deleteAllRequestDevice);



