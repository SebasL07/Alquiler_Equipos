import { requestDeviceService } from '../../src/services';
import RequestDevice from '../../src/models/request_device.model';
import Request from '../../src/models/request.model';
import Device from '../../src/models/device.model';

// Mockeamos los métodos de Sequelize
jest.mock('../../src/models/request_device.model', () => ({
  findAll: jest.fn(),
  findByPk: jest.fn(),
  create: jest.fn(),
}));

jest.mock('../../src/models/request.model', () => ({
  findByPk: jest.fn(),
}));

jest.mock('../../src/models/device.model', () => ({
  findOne: jest.fn(),
}));

describe('RequestDeviceService', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Limpia los mocks antes de cada prueba
  });

  test('getAllRequestDevices debe devolver una lista de requestDevices', async () => {
    const mockRequestDevices = [{ id: 1, request_id: 1, deviceName: 'Laptop', quantity: 2 }];
    (RequestDevice.findAll as jest.Mock).mockResolvedValue(mockRequestDevices);

    const result = await requestDeviceService.getAllRequestDevices();
    expect(result).toEqual(mockRequestDevices);
    expect(RequestDevice.findAll).toHaveBeenCalledTimes(1);
  });

  test('getRequestDeviceById debe devolver un requestDevice por ID', async () => {
    const mockRequestDevice = { id: 1, request_id: 1, deviceName: 'Laptop', quantity: 2 };
    (RequestDevice.findByPk as jest.Mock).mockResolvedValue(mockRequestDevice);

    const result = await requestDeviceService.getRequestDeviceById(1);
    expect(result).toEqual(mockRequestDevice);
    expect(RequestDevice.findByPk).toHaveBeenCalledWith(1);
  });

  test('createRequestDevice debe crear un requestDevice si request y device existen y hay stock', async () => {
    const requestDeviceData = { request_id: 1, deviceName: 'Laptop', quantity: 2 };
    const mockRequest = { id: 1 };
    const mockDevice = { name: 'Laptop', stock: 5 };
    const mockCreatedRequestDevice = { id: 3, ...requestDeviceData };

    (Request.findByPk as jest.Mock).mockResolvedValue(mockRequest);
    (Device.findOne as jest.Mock).mockResolvedValue(mockDevice);
    (RequestDevice.create as jest.Mock).mockResolvedValue(mockCreatedRequestDevice);

    const result = await requestDeviceService.createRequestDevice(requestDeviceData);
    expect(result).toEqual(mockCreatedRequestDevice);
    expect(Request.findByPk).toHaveBeenCalledWith(requestDeviceData.request_id);
    expect(Device.findOne).toHaveBeenCalledWith({ where: { name: requestDeviceData.deviceName } });
    expect(RequestDevice.create).toHaveBeenCalledWith(requestDeviceData);
  });

  test('createRequestDevice debe lanzar error si la request no existe', async () => {
    const requestDeviceData = { request_id: 99, deviceName: 'Laptop', quantity: 2 };
    (Request.findByPk as jest.Mock).mockResolvedValue(null);

    await expect(requestDeviceService.createRequestDevice(requestDeviceData))
      .rejects.toThrow('Request with id undefined not found');
  });

  test('createRequestDevice debe lanzar error si el device no existe', async () => {
    const requestDeviceData = { request_id: 1, deviceName: 'Laptop', quantity: 2 };
    const mockRequest = { id: 1 };

    (Request.findByPk as jest.Mock).mockResolvedValue(mockRequest);
    (Device.findOne as jest.Mock).mockResolvedValue(null);

    await expect(requestDeviceService.createRequestDevice(requestDeviceData))
      .rejects.toThrow('Device with name Laptop not found');
  });

  test('createRequestDevice debe lanzar error si no hay suficiente stock', async () => {
    const requestDeviceData = { request_id: 1, deviceName: 'Laptop', quantity: 10 };
    const mockRequest = { id: 1 };
    const mockDevice = { name: 'Laptop', stock: 5 };

    (Request.findByPk as jest.Mock).mockResolvedValue(mockRequest);
    (Device.findOne as jest.Mock).mockResolvedValue(mockDevice);

    await expect(requestDeviceService.createRequestDevice(requestDeviceData))
      .rejects.toThrow('Not enough stock for Laptop');
  });

  test('updateRequestDevice debe actualizar un requestDevice si existe', async () => {
    const updatedData = { deviceName: 'Laptop', quantity: 3 };
    const mockRequestDevice = { id: 1, request_id: 1, deviceName: 'Laptop', quantity: 2, update: jest.fn() };
    const mockDevice = { name: 'Laptop', stock: 5 };

    (RequestDevice.findByPk as jest.Mock).mockResolvedValue(mockRequestDevice);
    (Device.findOne as jest.Mock).mockResolvedValue(mockDevice);

    await requestDeviceService.updateRequestDevice(1, updatedData);
    expect(mockRequestDevice.update).toHaveBeenCalledWith(updatedData);
  });

  test('updateRequestDevice debe lanzar error si el requestDevice no existe', async () => {
    (RequestDevice.findByPk as jest.Mock).mockResolvedValue(null);

    await expect(requestDeviceService.updateRequestDevice(99, { deviceName: 'Laptop', quantity: 2 }))
      .rejects.toThrow('RequestDevice with id 99 not found');
  });

  test('updateRequestDevice debe lanzar error si el device no existe', async () => {
    const updatedData = { deviceName: 'Laptop', quantity: 2 };
    const mockRequestDevice = { id: 1, request_id: 1, deviceName: 'Laptop', quantity: 2 };

    (RequestDevice.findByPk as jest.Mock).mockResolvedValue(mockRequestDevice);
    (Device.findOne as jest.Mock).mockResolvedValue(null);

    await expect(requestDeviceService.updateRequestDevice(1, updatedData))
      .rejects.toThrow('Device with name Laptop not found');
  });

  test('updateRequestDevice debe lanzar error si no hay suficiente stock', async () => {
    const updatedData = { deviceName: 'Laptop', quantity: 10 };
    const mockRequestDevice = { id: 1, request_id: 1, deviceName: 'Laptop', quantity: 2 };
    const mockDevice = { name: 'Laptop', stock: 5 };

    (RequestDevice.findByPk as jest.Mock).mockResolvedValue(mockRequestDevice);
    (Device.findOne as jest.Mock).mockResolvedValue(mockDevice);

    await expect(requestDeviceService.updateRequestDevice(1, updatedData))
      .rejects.toThrow('Not enough stock for Laptop');
  });

  test('deleteRequestDevice debe eliminar un requestDevice existente', async () => {
    const mockRequestDevice = { id: 1, request_id: 1, deviceName: 'Laptop', quantity: 2, destroy: jest.fn() };
    (RequestDevice.findByPk as jest.Mock).mockResolvedValue(mockRequestDevice);

    await requestDeviceService.deleteRequestDevice(1);
    expect(mockRequestDevice.destroy).toHaveBeenCalledTimes(1);
  });

  test('deleteRequestDevice debe lanzar error si el requestDevice no existe', async () => {
    (RequestDevice.findByPk as jest.Mock).mockResolvedValue(null);

    await expect(requestDeviceService.deleteRequestDevice(99))
      .rejects.toThrow('RequestDevice with id 99 not found');
  });
});
