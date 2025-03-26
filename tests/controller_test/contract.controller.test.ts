import request from 'supertest';
import { app } from '../../src/app';
import { contractService, deviceService } from '../../src/services';

jest.mock('../../src/services'); // Mockeamos el servicio

describe('ContractController', () => {
    const mockContract = {
        user_Document: "9875542432654321", 
        date_Start: "2025-01-01",
        date_Finish: "2025-12-31",
        monthly_Value: 1200,
        contract: "New contract details",
        client_signature: "Signed"
    };

    beforeEach(async () => {
        jest.clearAllMocks();
        await contractService.deleteAllContract();
    });

    test('GET /api/contracts - debería devolver 404 si no hay contratos', async () => {
        (contractService.getAllContrats as jest.Mock).mockResolvedValue([]);

        const response = await request(app).get('/api/contracts');

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ msg: 'No contracts found' });
    });

    test('POST /api/contracts - debería crear un nuevo contrato', async () => {
        (contractService.createContract as jest.Mock).mockResolvedValue(mockContract);

        const response = await request(app)
            .post('/api/contracts')
            .send({
                user_Document: "987654321", 
                date_Start: "2025-01-01",
                date_Finish: "2025-12-31",
                monthly_Value: 1200,
                contract: "New contract details",
                client_signature: "Signed"
            });

        expect(response.status).toBe(201);
    });

    test('GET /api/contracts - debería devolver una lista de contratos', async () => {
        (contractService.getAllContrats as jest.Mock).mockResolvedValue([mockContract]);

        const response = await request(app).get('/api/contracts');

        expect(response.status).toBe(200);
        expect(response.body).toEqual([mockContract]);
    });

    test('GET /api/contracts/:id - debería devolver un contrato por ID', async () => {
        (contractService.getContractById as jest.Mock).mockResolvedValue(mockContract);

        const response = await request(app).get(`/api/contracts/1`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockContract);
    });

    test('GET /api/contracts/:id - debería devolver 404 si el contrato no existe', async () => {
        (contractService.getContractById as jest.Mock).mockResolvedValue(null);

        const response = await request(app).get(`/api/contracts/999`);

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ msg: 'Contract with id 999 not found' });
    });

    test('POST /api/contracts - debería devolver 400 si falta un campo', async () => {
        (contractService.createContract as jest.Mock).mockRejectedValue(new Error('User document is required'));

        const response = await request(app)
            .post('/api/contracts')
            .send({
                date_Start: new Date().toISOString(),
                date_Finish: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
                monthly_Value: 1500,
                status: "Pending",
                contract: "https://example.com/new-contract.pdf"
            });

        expect(response.status).toBe(400);
        expect(response.body).toMatchObject({
            msg: expect.arrayContaining([
                expect.objectContaining({
                    message: "User document is required",
                }),
            ]),
        });
    });

    test('PUT /api/contracts/:id - debería actualizar un contrato', async () => {
        (contractService.updateContract as jest.Mock).mockResolvedValue(mockContract);

        const response = await request(app)
            .put(`/api/contracts/1`)
            .send({ status: "Active" });

        expect(response.status).toBe(200);
    });

    test('PUT /api/contracts/:id - debería devolver 404 si el contrato no existe', async () => {
        (contractService.updateContract as jest.Mock).mockRejectedValue(new Error('Contract with id 999 not found'));

        const response = await request(app)
            .put('/api/contracts/999')
            .send({ status: "Active" });

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ msg: 'Contract with id 999 not found' });
    });

    test('DELETE /api/contracts/:id - debería eliminar un contrato', async () => {
        (contractService.deleteContract as jest.Mock).mockResolvedValue(undefined);

        const response = await request(app).delete(`/api/contracts/1`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ msg: 'Contract deleted' });
    });

    test('DELETE /api/contracts/:id - debería devolver 404 si el contrato no existe', async () => {
        (contractService.deleteContract as jest.Mock).mockRejectedValue(new Error('Contract with id 999 not found'));

        const response = await request(app).delete('/api/contracts/999');

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ msg: 'Contract with id 999 not found' });
    });

    test('DELETE /api/contracts - debería eliminar todos los contratos', async () => {
        (contractService.deleteAllContract as jest.Mock).mockResolvedValue(undefined);

        const response = await request(app).delete('/api/contracts');

        

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ msg: 'All contracts deleted' });
    });
    request (app).delete('api/devices');
});
