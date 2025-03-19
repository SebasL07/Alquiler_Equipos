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
exports.deviceController = void 0;
const device_service_1 = require("../services/device.service");
class DeviceController {
    getDevices(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const devices = yield device_service_1.deviceService.getAllDevices();
                if (devices.length === 0) {
                    res.status(404).json({ msg: 'No devices found' });
                }
                else {
                    res.json(devices);
                }
            }
            catch (error) {
                res.status(500).json({ msg: 'Server error' });
            }
        });
    }
    getDevice(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const device = yield device_service_1.deviceService.getDeviceById(Number(id));
                if (device) {
                    res.json(device);
                }
                else {
                    res.status(404).json({ msg: `Device with id ${id} not found` });
                }
            }
            catch (error) {
                res.status(500).json({ msg: 'Server error' });
            }
        });
    }
    postDevice(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const device = yield device_service_1.deviceService.createDevice(req.body);
                res.status(201).json({ msg: 'Device created', device });
            }
            catch (error) {
                res.status(400).json({ msg: error.message });
            }
        });
    }
    putDevice(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield device_service_1.deviceService.updateDevice(Number(id), req.body);
                res.status(200).json({ msg: 'Device updated' });
            }
            catch (error) {
                res.status(404).json({ msg: error.message });
            }
        });
    }
    deleteDevice(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield device_service_1.deviceService.deleteDevice(Number(id));
                res.status(200).json({ msg: 'Device deleted' });
            }
            catch (error) {
                res.status(404).json({ msg: error.message });
            }
        });
    }
}
exports.deviceController = new DeviceController();
//# sourceMappingURL=device.controller.js.map