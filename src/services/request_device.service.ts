import RequestDevice from "../models/request_device.model";
import Request from "../models/request.model";
import Device from "../models/device.model";

class RequestDeviceService {
    public async getAllRequestDevices() {
        return await RequestDevice.findAll();
    }

    public async getRequestDeviceById(id: number) {
        return await RequestDevice.findByPk(id);
    }

    public async createRequestDevice(requestDeviceData: any) {
        const request = await Request.findByPk(requestDeviceData.request_id);
        if (!request) throw new Error(`Request with id ${requestDeviceData.requestId} not found`);
        const device = await Device.findOne({ where: { name: requestDeviceData.deviceName } });
        if (!device) throw new Error(`Device with name ${requestDeviceData.deviceName} not found`);
        if (device.stock < requestDeviceData.quantity) throw new Error(`Not enough stock for ${requestDeviceData.deviceName}`);
        return await RequestDevice.create(requestDeviceData);
    }

    public async updateRequestDevice(id: number, requestDeviceData: any) {
        const requestDevice = await RequestDevice.findByPk(id);
        if (!requestDevice) throw new Error(`RequestDevice with id ${id} not found`);
        const device = await Device.findOne({ where: { name: requestDeviceData.deviceName } });
        if (!device) throw new Error(`Device with name ${requestDeviceData.deviceName} not found`);
        if (device.stock < requestDeviceData.quantity) throw new Error(`Not enough stock for ${requestDeviceData.deviceName}`);
        await requestDevice.update(requestDeviceData);
        return requestDevice;
    }

    public async deleteRequestDevice(id: number) {
        const requestDevice = await RequestDevice.findByPk(id);
        if (!requestDevice) throw new Error(`RequestDevice with id ${id} not found`);
        await requestDevice.destroy();
    }

    public async deleteAllRequest() {
        await RequestDevice.destroy({ where: {}, truncate: true });
    }

}

export const requestDeviceService = new RequestDeviceService();