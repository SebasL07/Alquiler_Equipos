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
exports.userService = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
class UserService {
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.default.findAll();
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.default.findByPk(id);
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.default.findOne({ where: { email } });
        });
    }
    createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const existEmail = yield user_model_1.default.findOne({ where: { email: userData.email } });
            if (existEmail)
                throw new Error('Email already exists');
            return yield user_model_1.default.create(userData);
        });
    }
    updateUserByEmail(email, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findOne({ where: { email } });
            if (!user)
                throw new Error(`User with email ${email} not found`);
            yield user.update(userData);
            return user;
        });
    }
    deleteUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findOne({ where: { email } });
            if (!user)
                throw new Error(`User with email ${email} not found`);
            yield user.destroy();
        });
    }
}
exports.userService = new UserService();
//# sourceMappingURL=user.service.js.map