import { requestService } from '../../src/services';
import Request from '../../src/models/request.model';
import User from '../../src/models/user.model';

// Mockeamos los métodos de Sequelize
jest.mock('../../src/models/request.model', () => ({
  findAll: jest.fn(),
  findByPk: jest.fn(),
  create: jest.fn(),
}));

jest.mock('../../src/models/user.model', () => ({
  findOne: jest.fn(),
}));

describe('RequestService', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Limpia los mocks antes de cada prueba
  });

  test('getAllRequests debe devolver una lista de solicitudes', async () => {
    const mockRequests = [{ id: 1, status: 'Pending' }, { id: 2, status: 'Approved' }];
    (Request.findAll as jest.Mock).mockResolvedValue(mockRequests);

    const result = await requestService.getAllRequests();
    expect(result).toEqual(mockRequests);
    expect(Request.findAll).toHaveBeenCalledTimes(1);
  });

  test('getRequestById debe devolver una solicitud por ID', async () => {
    const mockRequest = { id: 1, status: 'Pending' };
    (Request.findByPk as jest.Mock).mockResolvedValue(mockRequest);

    const result = await requestService.getRequestById(1);
    expect(result).toEqual(mockRequest);
    expect(Request.findByPk).toHaveBeenCalledWith(1);
  });

  test('createRequest debe crear una nueva solicitud si el usuario existe', async () => {
    const requestData = { user_Document: '12345', status: 'Pending' };
    const mockUser = { user_Document: '12345' };
    const mockCreatedRequest = { id: 3, ...requestData };

    (User.findOne as jest.Mock).mockResolvedValue(mockUser);
    (Request.create as jest.Mock).mockResolvedValue(mockCreatedRequest);

    const result = await requestService.createRequest(requestData);
    expect(result).toEqual(mockCreatedRequest);
    expect(User.findOne).toHaveBeenCalledWith({ where: { user_Document: requestData.user_Document } });
    expect(Request.create).toHaveBeenCalledWith(requestData);
  });

  test('createRequest debe lanzar error si el usuario no existe', async () => {
    const requestData = { user_Document: '99999', status: 'Pending' };
    (User.findOne as jest.Mock).mockResolvedValue(null);

    await expect(requestService.createRequest(requestData))
      .rejects.toThrow('User document 99999 not found');
  });

  test('updateRequest debe actualizar una solicitud existente', async () => {
    const updatedData = { status: 'Approved' };
    const mockRequest = { id: 1, status: 'Pending', update: jest.fn() };

    (Request.findByPk as jest.Mock).mockResolvedValue(mockRequest);

    await requestService.updateRequest(1, updatedData);
    expect(mockRequest.update).toHaveBeenCalledWith(updatedData);
  });

  test('deleteRequest debe eliminar una solicitud existente', async () => {
    const mockRequest = { id: 1, status: 'Pending', destroy: jest.fn() };
    (Request.findByPk as jest.Mock).mockResolvedValue(mockRequest);

    await requestService.deleteRequest(1);
    expect(mockRequest.destroy).toHaveBeenCalledTimes(1);
  });

  test('updateRequest debe lanzar error si la solicitud no existe', async () => {
    (Request.findByPk as jest.Mock).mockResolvedValue(null);

    await expect(requestService.updateRequest(99, { status: 'Approved' }))
      .rejects.toThrow('Request with id 99 not found');
  });

  test('deleteRequest debe lanzar error si la solicitud no existe', async () => {
    (Request.findByPk as jest.Mock).mockResolvedValue(null);

    await expect(requestService.deleteRequest(99))
      .rejects.toThrow('Request with id 99 not found');
  });
});
