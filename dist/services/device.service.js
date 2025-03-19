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
exports.deviceService = void 0;
const device_model_1 = __importDefault(require("../models/device.model"));
class DeviceService {
    getAllDevices() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield device_model_1.default.findAll();
        });
    }
    getDeviceById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield device_model_1.default.findByPk(id);
        });
    }
    createDevice(deviceData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield device_model_1.default.create(deviceData);
        });
    }
    updateDevice(id, deviceData) {
        return __awaiter(this, void 0, void 0, function* () {
            const device = yield device_model_1.default.findByPk(id);
            if (!device)
                throw new Error(`Device with id ${id} not found`);
            yield device.update(deviceData);
            return device;
        });
    }
    deleteDevice(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const device = yield device_model_1.default.findByPk(id);
            if (!device)
                throw new Error(`Device with id ${id} not found`);
            yield device.destroy();
        });
    }
}
exports.deviceService = new DeviceService();
//# sourceMappingURL=device.service.js.map