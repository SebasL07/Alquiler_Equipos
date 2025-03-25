import request from 'supertest';
import { app } from '../../src/app';
import { requestDeviceService } from '../../src/services';

jest.mock('../../src/services'); // Mockeamos el servicio

describe('RequestDeviceController', () => {
    const mockRequestDevice = {
        request_id: 5,
        deviceName: "Laptop Dell XPS 15",
        quantity: 2,
    };

    beforeEach(async () => {
        jest.clearAllMocks();
        (requestDeviceService.deleteRequestDevice as jest.Mock).mockClear();
    });

    test('GET /api/request-devices - debería devolver 404 si no hay dispositivos en solicitudes', async () => {
        (requestDeviceService.getAllRequestDevices as jest.Mock).mockResolvedValue([]);

        const response = await request(app).get('/api/request-devices');

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ msg: 'No request devices found' });
    });

    test('GET /api/request-devices - debería devolver una lista de dispositivos en solicitudes', async () => {
        (requestDeviceService.getAllRequestDevices as jest.Mock).mockResolvedValue([mockRequestDevice]);

        const response = await request(app).get('/api/request-devices');

        expect(response.status).toBe(200);
        expect(response.body).toEqual([mockRequestDevice]);
    });

    test('GET /api/request-devices/:id - debería devolver un dispositivo en solicitud por ID', async () => {
        (requestDeviceService.getRequestDeviceById as jest.Mock).mockResolvedValue(mockRequestDevice);

        const response = await request(app).get(`/api/request-devices/1`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockRequestDevice);
    });

    test('GET /api/request-devices/:id - debería devolver 404 si el dispositivo en solicitud no existe', async () => {
        (requestDeviceService.getRequestDeviceById as jest.Mock).mockResolvedValue(null);

        const response = await request(app).get(`/api/request-devices/999`);

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ msg: 'Request device with id 999 not found' });
    });

    test('POST /api/request-devices - debería crear un nuevo dispositivo en solicitud', async () => {
        (requestDeviceService.createRequestDevice as jest.Mock).mockResolvedValue(mockRequestDevice);

        const response = await request(app)
            .post('/api/request-devices')
            .send({
                request_id: 1,
                deviceName: "Laptop",
                quantity: 2
            });

        expect(response.status).toBe(201);
        expect(response.body).toEqual({ msg: 'Request device created', requestDevice: mockRequestDevice });
    });

    test('POST /api/request-devices - debería devolver 400 si falta un campo', async () => {
        (requestDeviceService.createRequestDevice as jest.Mock).mockRejectedValue(new Error('Request ID is required'));

        const response = await request(app)
            .post('/api/request-devices')
            .send({
                deviceName: "Laptop",
                quantity: 2
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ msg: 'Request ID is required' });
    });

    test('PUT /api/request-devices/:id - debería actualizar un dispositivo en solicitud', async () => {
        (requestDeviceService.updateRequestDevice as jest.Mock).mockResolvedValue(mockRequestDevice);

        const response = await request(app)
            .put(`/api/request-devices/1`)
            .send({ quantity: 3 });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ msg: 'Request device updated' });
    });

    test('PUT /api/request-devices/:id - debería devolver 404 si el dispositivo en solicitud no existe', async () => {
        (requestDeviceService.updateRequestDevice as jest.Mock).mockRejectedValue(new Error('RequestDevice with id 999 not found'));

        const response = await request(app)
            .put('/api/request-devices/999')
            .send({ quantity: 3 });

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ msg: 'RequestDevice with id 999 not found' });
    });

    test('DELETE /api/request-devices/:id - debería eliminar un dispositivo en solicitud', async () => {
        (requestDeviceService.deleteRequestDevice as jest.Mock).mockResolvedValue(undefined);

        const response = await request(app).delete(`/api/request-devices/1`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ msg: 'Request device deleted' });
    });

    test('DELETE /api/request-devices/:id - debería devolver 404 si el dispositivo en solicitud no existe', async () => {
        (requestDeviceService.deleteRequestDevice as jest.Mock).mockRejectedValue(new Error('RequestDevice with id 999 not found'));

        const response = await request(app).delete('/api/request-devices/999');

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ msg: 'RequestDevice with id 999 not found' });
    });
});
