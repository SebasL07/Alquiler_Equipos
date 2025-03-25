import { contractDeviceService } from '../../src/services';
import ContractDevice from '../../src/models/contract_device.model';
import Contract from '../../src/models/contract.model';
import Device from '../../src/models/device.model';

// Mockeamos los métodos de Sequelize
jest.mock('../../src/models/contract_device.model', () => ({
  findAll: jest.fn(),
  findByPk: jest.fn(),
  create: jest.fn(),
}));

jest.mock('../../src/models/contract.model', () => ({
  findByPk: jest.fn(),
}));

jest.mock('../../src/models/device.model', () => ({
  findOne: jest.fn(),
}));

describe('ContractDeviceService', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Limpia los mocks antes de cada prueba
  });

  test('getAllContractDevices debe devolver una lista de dispositivos en contrato', async () => {
    const mockContractsDevices = [{ id: 1, id_contract: 1, deviceName: 'Laptop', rented_quantity: 2 }];
    (ContractDevice.findAll as jest.Mock).mockResolvedValue(mockContractsDevices);

    const result = await contractDeviceService.getAllContractDevices();
    expect(result).toEqual(mockContractsDevices);
    expect(ContractDevice.findAll).toHaveBeenCalledTimes(1);
  });

  test('getContractDeviceById debe devolver un dispositivo en contrato por ID', async () => {
    const mockContractDevice = { id: 1, id_contract: 1, deviceName: 'Laptop', rented_quantity: 2 };
    (ContractDevice.findByPk as jest.Mock).mockResolvedValue(mockContractDevice);

    const result = await contractDeviceService.getContractDeviceById(1);
    expect(result).toEqual(mockContractDevice);
    expect(ContractDevice.findByPk).toHaveBeenCalledWith(1);
  });

  test('createContractDevice debe crear un dispositivo en contrato si el contrato y el dispositivo existen', async () => {
    const contractDeviceData = { id_contract: 1, deviceName: 'Laptop', rented_quantity: 2 };
    const mockContract = { id: 1 };
    const mockDevice = { name: 'Laptop', stock: 5, update: jest.fn() };
    const mockCreatedContractDevice = { id: 1, ...contractDeviceData };

    (Contract.findByPk as jest.Mock).mockResolvedValue(mockContract);
    (Device.findOne as jest.Mock).mockResolvedValue(mockDevice);
    (ContractDevice.create as jest.Mock).mockResolvedValue(mockCreatedContractDevice);

    const result = await contractDeviceService.createContractDevice(contractDeviceData);
    expect(result).toEqual(mockCreatedContractDevice);
    expect(Contract.findByPk).toHaveBeenCalledWith(1);
    expect(Device.findOne).toHaveBeenCalledWith({ where: { name: contractDeviceData.deviceName } });
    expect(mockDevice.update).toHaveBeenCalledWith({ stock: mockDevice.stock - contractDeviceData.rented_quantity });
  });

  test('createContractDevice debe lanzar error si el contrato no existe', async () => {
    const contractDeviceData = { id_contract: 99, deviceName: 'Laptop', rented_quantity: 2 };
    (Contract.findByPk as jest.Mock).mockResolvedValue(null);

    await expect(contractDeviceService.createContractDevice(contractDeviceData))
      .rejects.toThrow('Contract with id 99 not found');
  });

  test('createContractDevice debe lanzar error si el dispositivo no existe', async () => {
    const contractDeviceData = { id_contract: 1, deviceName: 'Laptop', rented_quantity: 2 };
    (Contract.findByPk as jest.Mock).mockResolvedValue({ id: 1 });
    (Device.findOne as jest.Mock).mockResolvedValue(null);

    await expect(contractDeviceService.createContractDevice(contractDeviceData))
      .rejects.toThrow('Device with id Laptop not found');
  });

  test('createContractDevice debe lanzar error si no hay suficiente stock', async () => {
    const contractDeviceData = { id_contract: 1, deviceName: 'Laptop', rented_quantity: 10 };
    const mockDevice = { name: 'Laptop', stock: 5 };

    (Contract.findByPk as jest.Mock).mockResolvedValue({ id: 1 });
    (Device.findOne as jest.Mock).mockResolvedValue(mockDevice);

    await expect(contractDeviceService.createContractDevice(contractDeviceData))
      .rejects.toThrow('Not enough stock available for device id undefined');
  });

  test('updateContractDevice debe actualizar un contrato de dispositivo si existe', async () => {
    const updatedData = { rented_quantity: 3 };
    const mockContractDevice = { id: 1, update: jest.fn() };

    (ContractDevice.findByPk as jest.Mock).mockResolvedValue(mockContractDevice);

    await contractDeviceService.updateContractDevice(1, updatedData);
    expect(mockContractDevice.update).toHaveBeenCalledWith(updatedData);
  });

  test('updateContractDevice debe lanzar error si el contrato de dispositivo no existe', async () => {
    (ContractDevice.findByPk as jest.Mock).mockResolvedValue(null);

    await expect(contractDeviceService.updateContractDevice(99, { rented_quantity: 3 }))
      .rejects.toThrow('Contract device with id 99 not found');
  });

  test('deleteContractDevice debe eliminar un contrato de dispositivo existente', async () => {
    const mockContractDevice = { id: 1, destroy: jest.fn() };
    (ContractDevice.findByPk as jest.Mock).mockResolvedValue(mockContractDevice);

    await contractDeviceService.deleteContractDevice(1);
    expect(mockContractDevice.destroy).toHaveBeenCalledTimes(1);
  });

  test('deleteContractDevice debe lanzar error si el contrato de dispositivo no existe', async () => {
    (ContractDevice.findByPk as jest.Mock).mockResolvedValue(null);

    await expect(contractDeviceService.deleteContractDevice(99))
      .rejects.toThrow('Contract device with id 99 not found');
  });
});
