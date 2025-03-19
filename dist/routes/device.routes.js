"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deviceRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
exports.deviceRouter = (0, express_1.Router)();
exports.deviceRouter.get('/', controllers_1.deviceController.getDevices);
exports.deviceRouter.get('/:id', controllers_1.deviceController.getDevice);
exports.deviceRouter.post('/', controllers_1.deviceController.postDevice);
exports.deviceRouter.put('/:id', controllers_1.deviceController.putDevice);
exports.deviceRouter.delete('/:id', controllers_1.deviceController.deleteDevice);
//# sourceMappingURL=device.routes.js.map