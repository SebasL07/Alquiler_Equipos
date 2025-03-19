"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connect_1 = __importDefault(require("../database/connect"));
const Device = connect_1.default.define('device', {
    name: {
        type: sequelize_1.DataTypes.STRING,
    },
    type: {
        type: sequelize_1.DataTypes.STRING,
    },
    state: {
        type: sequelize_1.DataTypes.STRING,
    },
    description: {
        type: sequelize_1.DataTypes.STRING
    },
    stock: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    image: {
        type: sequelize_1.DataTypes.STRING
    }
});
exports.default = Device;
//# sourceMappingURL=device.model.js.map