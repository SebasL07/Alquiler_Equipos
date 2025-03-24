import { Router } from "express";
import { requestController } from "../controllers";
import { validateSchema } from "../middleware";
import { requestSchema } from "../schemas";

export const requestRouter = Router();

requestRouter.get('/', requestController.getRequests);
requestRouter.get('/:id', requestController.getRequest);
requestRouter.post('/', validateSchema(requestSchema), requestController.postRequest);
requestRouter.put('/:id', validateSchema(requestSchema), requestController.putRequest);
requestRouter.delete('/:id', requestController.deleteRequest);


