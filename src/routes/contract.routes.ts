import { Router } from "express";
import { contractController } from "../controllers";
import { validateSchema } from "../middleware";
import { contractSchema } from "../schemas";

export const contractRouter = Router();

contractRouter.get('/', contractController.getContracts);
contractRouter.get('/:id', contractController.getContract);
contractRouter.post('/', validateSchema(contractSchema.innerType()), contractController.postContract);
contractRouter.put('/:id', validateSchema(contractSchema.innerType()), contractController.putContract);
contractRouter.delete('/:id', contractController.deleteContract);


