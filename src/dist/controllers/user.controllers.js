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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_1 = __importDefault(require("../models/user"));
class UserController {
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_1.default.findAll();
                if (users.length === 0) {
                    res.status(404).json({
                        msg: 'No users found'
                    });
                }
                else {
                    res.json(users);
                }
            }
            catch (error) {
                res.status(500).json({
                    msg: 'Server error'
                });
            }
        });
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const user = yield user_1.default.findByPk(id);
                if (user) {
                    res.json(user);
                }
                else {
                    res.status(404).json({
                        msg: `User with id ${id} not found`
                    });
                }
            }
            catch (error) {
                res.status(500).json({
                    msg: 'Server error'
                });
            }
        });
    }
    postUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            try {
                const existEmail = yield user_1.default.findOne({
                    where: {
                        email: body.email
                    }
                });
                if (existEmail) {
                    return res.status(400).json({
                        msg: 'Email already exists'
                    });
                }
                const user = yield user_1.default.create({
                    name: body.name,
                    email: body.email,
                    password: body.password,
                    cellphone: body.cellphone,
                    adress: body.adress
                });
                yield (yield user).save();
                res.status(200).json({ msg: 'User created' });
            }
            catch (error) {
                res.status(500).json({
                    msg: 'Error server'
                });
            }
        });
    }
    putUserByEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.params;
            const { body } = req;
            try {
                const user = yield user_1.default.findOne({ where: { email } });
                if (user) {
                    yield user.update(body);
                    res.status(200).json({
                        msg: 'User updated'
                    });
                }
                else {
                    res.status(404).json({
                        msg: `User with email ${email} not found`
                    });
                }
            }
            catch (error) {
                res.status(500).json({
                    msg: 'Server error'
                });
            }
        });
    }
    deleteUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.params;
            try {
                const user = yield user_1.default.findOne({ where: { email } });
                if (user) {
                    yield user.destroy();
                    res.status(200).json({
                        msg: 'User deleted'
                    });
                }
                else {
                    res.status(404).json({
                        msg: `User with email ${email} not found`
                    });
                }
            }
            catch (error) {
                res.status(500).json({
                    msg: 'Server error'
                });
            }
        });
    }
}
exports.userController = new UserController();
//# sourceMappingURL=user.controllers.js.map