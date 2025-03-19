"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connect_1 = __importDefault(require("../database/connect"));
const User = connect_1.default.define('user', {
    name: {
        type: sequelize_1.DataTypes.STRING
    },
    email: {
        type: sequelize_1.DataTypes.STRING
    },
    password: {
        type: sequelize_1.DataTypes.STRING
    },
    cellphone: {
        type: sequelize_1.DataTypes.INTEGER
    },
    adress: {
        type: sequelize_1.DataTypes.STRING
    }
});
exports.default = User;
//# sourceMappingURL=user.model.js.map