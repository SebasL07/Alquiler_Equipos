import request from 'supertest';
import { app } from '../../src/app';
import { contractDeviceService, contractService, deviceService } from '../../src/services';
import Contract from '../../src/models/contract.model';
import Device from '../../src/models/device.model';

jest.mock('../../src/services'); // Mockeamos los servicios

let createdContract: any;
let createdDevice: any;

beforeAll(async () => {
    // Crear un contrato antes de las pruebas
    createdContract = await Contract.create({
        user_Document: "987654321",
        date_Start: "2024-03-01",
        date_Finish: "2025-03-01",
        monthly_Value: 1000,
        contract: "Rental agreement"
    });

    // Crear un dispositivo antes de las pruebas
    createdDevice = await Device.create({
        name: "Laptop Dell XPS 15",
        type: "Laptop",
        state: "New",
        description: "High-performance laptop",
        stock: 5,
        image: "https://example.com/images/laptop-dell.jpg"
    });
});

describe('ContractDeviceController', () => {
    const mockContractDevice = {
        id_contract: 5,
        deviceName: "Laptop Dell XPS 15",
        rented_quantity: 2,
        total_price: 2000,
        delivery_status: "Pending"
    };

    beforeEach(async () => {
        jest.clearAllMocks();
        (contractDeviceService.deleteContractDevice as jest.Mock).mockClear();
    });

    test('GET /api/contract_devices - debería devolver 404 si no hay dispositivos en contratos', async () => {
        (contractDeviceService.getAllContractDevices as jest.Mock).mockResolvedValue([]);

        const response = await request(app).get('/api/contract_devices');

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ msg: 'No contract devices found' });
    });

    test('GET /api/contract_devices/:id - debería devolver 404 si el dispositivo en contrato no existe', async () => {
        (contractDeviceService.getContractDeviceById as jest.Mock).mockResolvedValue(null);

        const response = await request(app).get(`/api/contract_devices/999`);

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ msg: 'Contract device with id 999 not found' });
    });

    test('POST /api/contract_devices - debería crear un nuevo dispositivo en contrato', async () => {
        (contractDeviceService.createContractDevice as jest.Mock).mockResolvedValue(mockContractDevice);

        const response = await request(app)
            .post('/api/contract_devices')
            .send({
                id_contract: 1,
                deviceName: "Laptop Dell XPS 15",
                rented_quantity: 2,
                total_price: 2000,
                delivery_status: "Pending"
            });

        expect(response.status).toBe(201);
        expect(response.body).toEqual({ msg: 'Contract device created', contractDevice: mockContractDevice });
    });

    test('GET /api/contract_devices - debería devolver una lista de dispositivos en contratos', async () => {
        (contractDeviceService.getAllContractDevices as jest.Mock).mockResolvedValue([mockContractDevice]);

        const response = await request(app).get('/api/contract_devices');

        expect(response.status).toBe(200);
        expect(response.body).toEqual([mockContractDevice]);
    });

    test('GET /api/contract_devices/:id - debería devolver un dispositivo en contrato por ID', async () => {
        (contractDeviceService.getContractDeviceById as jest.Mock).mockResolvedValue(mockContractDevice);

        const response = await request(app).get(`/api/contract_devices/1`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockContractDevice);
    });

    test('POST /api/contract_devices - debería devolver 400 si falta un campo', async () => {
        (contractDeviceService.createContractDevice as jest.Mock).mockRejectedValue(new Error('Contract ID is required'));

        const response = await request(app)
            .post('/api/contract_devices')
            .send({
                deviceName: "Laptop Dell XPS 15",
                rented_quantity: 2,
                total_price: 2000
            });

        expect(response.status).toBe(400);
        expect(response.body).toMatchObject({
            msg: expect.arrayContaining([
                expect.objectContaining({
                    message: "Contract ID is required",
                    path: expect.arrayContaining(["id_contract"]),
                }),
            ]),
        });
    });

    test('PUT /api/contract_devices/:id - debería actualizar un dispositivo en contrato', async () => {
        (contractDeviceService.updateContractDevice as jest.Mock).mockResolvedValue(mockContractDevice);

        const response = await request(app)
            .put(`/api/contract_devices/1`)
            .send({
                id_contract: 3,
                deviceName: "Laptop Dell XPS 15",
                rented_quantity: 3,
                total_price: 3000,
                delivery_status: "Delivered"
            });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ msg: 'Contract device updated' });
    });

    test('PUT /api/contract_devices/:id - debería devolver 404 si el dispositivo en contrato no existe', async () => {
        (contractDeviceService.updateContractDevice as jest.Mock).mockRejectedValue(new Error('ContractDevice with id 999 not found'));

        const response = await request(app)
            .put('/api/contract_devices/999')
            .send({ rented_quantity: 3 });

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ msg: 'ContractDevice with id 999 not found' });
    });

    test('DELETE /api/contract_devices/:id - debería eliminar un dispositivo en contrato', async () => {
        (contractDeviceService.deleteContractDevice as jest.Mock).mockResolvedValue(undefined);

        const response = await request(app).delete(`/api/contract_devices/1`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ msg: 'Contract device deleted' });
    });

    test('DELETE /api/contract_devices/:id - debería devolver 404 si el dispositivo en contrato no existe', async () => {
        (contractDeviceService.deleteContractDevice as jest.Mock).mockRejectedValue(new Error('ContractDevice with id 999 not found'));

        const response = await request(app).delete('/api/contract_devices/999');

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ msg: 'ContractDevice with id 999 not found' });
    });

    test('DELETE /api/contract_devices - debería eliminar todos los contratos de dispositivos', async () => {
        (contractDeviceService.deleteAllContractDevice as jest.Mock).mockResolvedValue(undefined);

        const response = await request(app).delete('/api/contract_devices');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ msg: 'All contractDevices deleted' });
    });

    // Eliminamos todos los dispositivos y contratos creados para limpiar la base de datos
    request(app).delete('/api/devices');
    request(app).delete('/api/contracts');
});
