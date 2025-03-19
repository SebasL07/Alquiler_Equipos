import Device from '../models/device.model';

class DeviceService {
    public async getAllDevices() {
        return await Device.findAll();
    }

    public async getDeviceById(id: number) {
        return await Device.findByPk(id);
    }

    public async createDevice(deviceData: any) {
        return await Device.create(deviceData);
    }

    public async updateDevice(id: number, deviceData: any) {
        const device = await Device.findByPk(id);
        if (!device) throw new Error(`Device with id ${id} not found`);
        await device.update(deviceData);
        return device;
    }

    public async deleteDevice(id: number) {
        const device = await Device.findByPk(id);
        if (!device) throw new Error(`Device with id ${id} not found`);
        await device.destroy();
    }
}

export const deviceService = new DeviceService();
