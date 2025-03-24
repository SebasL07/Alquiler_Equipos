import ContractDevice from "../models/contract_device.model";
import Contract from "../models/contract.model";
import Device from "../models/device.model";

class ContractDeviceService {
    public async getAllContractDevices() {
        return await ContractDevice.findAll();
    }

    public async getContractDeviceById(id: number) {
        return await ContractDevice.findByPk(id);
    }

    public async createContractDevice(contractDeviceData: any) {
        const contract = await Contract.findByPk(contractDeviceData.id_contract);
        if (!contract) throw new Error(`Contract with id ${contractDeviceData.id_contract} not found`);

        const device = await Device.findOne({ where: { name: contractDeviceData.deviceName } });
        if (!device) throw new Error(`Device with id ${contractDeviceData.deviceName} not found`);

        if (device.stock < contractDeviceData.rented_quantity) {
            throw new Error(`Not enough stock available for device id ${contractDeviceData.id_device}`);
        }

        // Reducir stock del dispositivo
        await device.update({ stock: device.stock - contractDeviceData.rented_quantity });

        return await ContractDevice.create(contractDeviceData);
    }

    public async updateContractDevice(id: number, contractDeviceData: any) {
        const contractDevice = await ContractDevice.findByPk(id);
        if (!contractDevice) throw new Error(`Contract device with id ${id} not found`);

        return await contractDevice.update(contractDeviceData);
    }

    public async deleteContractDevice(id: number) {
        const contractDevice = await ContractDevice.findByPk(id);
        if (!contractDevice) throw new Error(`Contract device with id ${id} not found`);

        await contractDevice.destroy();
    }
}

export const contractDeviceService = new ContractDeviceService();
