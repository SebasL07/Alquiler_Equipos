import { Router } from "express";
import { contractDeviceController } from "../controllers";
import { validateSchema } from "../middleware";
import { ContractDeviceSchema } from "../schemas";

export const contractDeviceRouter = Router();

contractDeviceRouter.get('/', contractDeviceController.getAllContractDevices);
contractDeviceRouter.get('/:id', contractDeviceController.getContractDeviceById);
contractDeviceRouter.post('/', validateSchema(ContractDeviceSchema), contractDeviceController.createContractDevice);
contractDeviceRouter.put('/:id', contractDeviceController.updateContractDevice);
contractDeviceRouter.delete('/:id', contractDeviceController.deleteContractDevice);
contractDeviceRouter.delete('/', contractDeviceController.deleteAllContractDevice);

