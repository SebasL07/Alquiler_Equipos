"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.get('/', controllers_1.userController.getUsers);
router.get('/:id', controllers_1.userController.getUser);
router.post('/', controllers_1.userController.postUsers);
router.put('/:email', controllers_1.userController.putUserByEmail);
router.delete('/:email', controllers_1.userController.deleteUsers);
exports.default = router;
//# sourceMappingURL=user.routes.js.map