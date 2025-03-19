"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("../services/user.service");
class UserController {
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_service_1.userService.getAllUsers();
                if (users.length === 0) {
                    res.status(404).json({ msg: 'No users found' });
                }
                else {
                    res.json(users);
                }
            }
            catch (error) {
                res.status(500).json({ msg: 'Server error' });
            }
        });
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const user = yield user_service_1.userService.getUserById(id);
                if (user) {
                    res.json(user);
                }
                else {
                    res.status(404).json({ msg: `User with id ${id} not found` });
                }
            }
            catch (error) {
                res.status(500).json({ msg: 'Server error' });
            }
        });
    }
    postUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield user_service_1.userService.createUser(req.body);
                res.status(200).json({ msg: 'User created' });
            }
            catch (error) {
                res.status(400).json({ msg: error.message });
            }
        });
    }
    putUserByEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.params;
            try {
                yield user_service_1.userService.updateUserByEmail(email, req.body);
                res.status(200).json({ msg: 'User updated' });
            }
            catch (error) {
                res.status(404).json({ msg: error.message });
            }
        });
    }
    deleteUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.params;
            try {
                yield user_service_1.userService.deleteUserByEmail(email);
                res.status(200).json({ msg: 'User deleted' });
            }
            catch (error) {
                res.status(404).json({ msg: error.message });
            }
        });
    }
}
exports.userController = new UserController();
//# sourceMappingURL=user.controller.js.map