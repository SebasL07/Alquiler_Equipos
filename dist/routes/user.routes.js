"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.get('/', controllers_1.userController.getUsers);
exports.userRouter.get('/:id', controllers_1.userController.getUser);
exports.userRouter.post('/', controllers_1.userController.postUsers);
exports.userRouter.put('/:email', controllers_1.userController.putUserByEmail);
exports.userRouter.delete('/:email', controllers_1.userController.deleteUsers);
//# sourceMappingURL=user.routes.js.map