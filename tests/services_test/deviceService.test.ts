import { deviceService } from '../../src/services';
import Device from '../../src/models/device.model'; // Adjusted to import the correct model

// Mockeamos los métodos de Sequelize
jest.mock('../../src/models/device.model', () => ({
  findAll: jest.fn(),
  findByPk: jest.fn(),
  create: jest.fn(),
}));

describe('DeviceService', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Limpia los mocks antes de cada prueba
  });

  test('getAllDevices debe devolver una lista de dispositivos', async () => {
    const mockDevices = [{ id: 1, name: 'Laptop' }, { id: 2, name: 'Tablet' }];
    (Device.findAll as jest.Mock).mockResolvedValue(mockDevices);

    const result = await deviceService.getAllDevices();
    expect(result).toEqual(mockDevices);
    expect(Device.findAll).toHaveBeenCalledTimes(1);
  });

  test('getDeviceById debe devolver un dispositivo por ID', async () => {
    const mockDevice = { id: 1, name: 'Laptop' };
    (Device.findByPk as jest.Mock).mockResolvedValue(mockDevice);

    const result = await deviceService.getDeviceById(1);
    expect(result).toEqual(mockDevice);
    expect(Device.findByPk).toHaveBeenCalledWith(1);
  });

  test('createDevice debe crear un nuevo dispositivo', async () => {
    const newDevice = { name: 'Monitor' };
    const mockCreatedDevice = { id: 3, ...newDevice };
    (Device.create as jest.Mock).mockResolvedValue(mockCreatedDevice);

    const result = await deviceService.createDevice(newDevice);
    expect(result).toEqual(mockCreatedDevice);
    expect(Device.create).toHaveBeenCalledWith(newDevice);
  });

  test('updateDevice debe actualizar un dispositivo existente', async () => {
    const updatedData = { name: 'Smartphone' };
    const mockDevice = { id: 1, name: 'Laptop', update: jest.fn() };
    (Device.findByPk as jest.Mock).mockResolvedValue(mockDevice);

    await deviceService.updateDevice(1, updatedData);
    expect(mockDevice.update).toHaveBeenCalledWith(updatedData);
  });

  test('deleteDevice debe eliminar un dispositivo existente', async () => {
    const mockDevice = { id: 1, name: 'Laptop', destroy: jest.fn() };
    (Device.findByPk as jest.Mock).mockResolvedValue(mockDevice);

    await deviceService.deleteDevice(1);
    expect(mockDevice.destroy).toHaveBeenCalledTimes(1);
  });

  test('updateDevice debe lanzar error si el dispositivo no existe', async () => {
    (Device.findByPk as jest.Mock).mockResolvedValue(null);

    await expect(deviceService.updateDevice(99, { name: 'TV' }))
      .rejects.toThrow('Device with id 99 not found');
  });

  test('deleteDevice debe lanzar error si el dispositivo no existe', async () => {
    (Device.findByPk as jest.Mock).mockResolvedValue(null);

    await expect(deviceService.deleteDevice(99))
      .rejects.toThrow('Device with id 99 not found');
  });
});
