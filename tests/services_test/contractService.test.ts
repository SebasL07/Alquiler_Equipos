import { contractService } from '../../src/services';
import Contract from '../../src/models/contract.model';
import User from '../../src/models/user.model';

// Mockeamos los métodos de Sequelize
jest.mock('../../src/models/contract.model', () => ({
  findAll: jest.fn(),
  findByPk: jest.fn(),
  create: jest.fn(),
}));

jest.mock('../../src/models/user.model', () => ({
  findOne: jest.fn(),
}));

describe('ContractService', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Limpia los mocks antes de cada prueba
  });

  test('getAllContracts debe devolver una lista de contratos', async () => {
    const mockContracts = [{ id: 1, user_Document: '123456', date_Start: new Date(), date_Finish: new Date() }];
    (Contract.findAll as jest.Mock).mockResolvedValue(mockContracts);

    const result = await contractService.getAllContrats();
    expect(result).toEqual(mockContracts);
    expect(Contract.findAll).toHaveBeenCalledTimes(1);
  });

  test('getContractById debe devolver un contrato por ID', async () => {
    const mockContract = { id: 1, user_Document: '123456', date_Start: new Date(), date_Finish: new Date() };
    (Contract.findByPk as jest.Mock).mockResolvedValue(mockContract);

    const result = await contractService.getContractById(1);
    expect(result).toEqual(mockContract);
    expect(Contract.findByPk).toHaveBeenCalledWith(1);
  });

  test('createContract debe crear un contrato si el usuario existe', async () => {
    const contractData = { user_Document: '123456', date_Start: '2023-01-01', date_Finish: '2023-12-31' };
    const mockUser = { user_Document: '123456' };
    const mockCreatedContract = { id: 1, ...contractData };

    (User.findOne as jest.Mock).mockResolvedValue(mockUser);
    (Contract.create as jest.Mock).mockResolvedValue(mockCreatedContract);

    const result = await contractService.createContract(contractData);
    expect(result).toEqual(mockCreatedContract);
    expect(User.findOne).toHaveBeenCalledWith({ where: { user_Document: contractData.user_Document } });
    expect(Contract.create).toHaveBeenCalledWith(expect.objectContaining({
      user_Document: '123456',
      date_Start: expect.any(Date),
      date_Finish: expect.any(Date),
    }));
  });

  test('createContract debe lanzar error si el usuario no existe', async () => {
    const contractData = { user_Document: '999999', date_Start: '2023-01-01', date_Finish: '2023-12-31' };
    (User.findOne as jest.Mock).mockResolvedValue(null);

    await expect(contractService.createContract(contractData))
      .rejects.toThrow('User document 999999 not found');
  });

  test('updateContract debe actualizar un contrato si existe', async () => {
    const updatedData = { date_Finish: '2024-12-31' };
    const mockContract = { id: 1, user_Document: '123456', date_Start: new Date(), date_Finish: new Date(), update: jest.fn() };

    (Contract.findByPk as jest.Mock).mockResolvedValue(mockContract);

    await contractService.updateContract(1, updatedData);
    expect(mockContract.update).toHaveBeenCalledWith(updatedData);
  });

  test('updateContract debe lanzar error si el contrato no existe', async () => {
    (Contract.findByPk as jest.Mock).mockResolvedValue(null);

    await expect(contractService.updateContract(99, { date_Finish: '2024-12-31' }))
      .rejects.toThrow('Request with id 99 not found');
  });

  test('deleteContract debe eliminar un contrato existente', async () => {
    const mockContract = { id: 1, destroy: jest.fn() };
    (Contract.findByPk as jest.Mock).mockResolvedValue(mockContract);

    await contractService.deleteContract(1);
    expect(mockContract.destroy).toHaveBeenCalledTimes(1);
  });

  test('deleteContract debe lanzar error si el contrato no existe', async () => {
    (Contract.findByPk as jest.Mock).mockResolvedValue(null);

    await expect(contractService.deleteContract(99))
      .rejects.toThrow('Request with id 99 not found');
  });
});
