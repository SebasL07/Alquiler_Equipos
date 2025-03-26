import request from 'supertest';
import { app } from '../../src/app'; 
import { deviceService } from '../../src/services';

jest.mock('../../src/services'); // Mockeamos el servicio

describe('DeviceController', () => {
    const mockDevice = {
        name: "Device 1",
        type: "Sensor",
        state: "Active",
        description: "A sensor device",
        stock: 10,
        image: "device1.jpg" 
    };

    beforeEach(async () => {
        jest.clearAllMocks();
        await deviceService.deleteAllDevices(); 
    });

    test('Debería eliminar todos los dispositivos y devolver un mensaje de éxito12', async () => {
        (deviceService.deleteAllDevices as jest.Mock).mockResolvedValue(undefined);

        const response = await request(app).delete('/api/devices');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ msg: 'All devices deleted' });
    });

    test('GET /api/devices - debería devolver 404 si no hay dispositivos', async () => {
        (deviceService.getAllDevices as jest.Mock).mockResolvedValue([]);

        const response = await request(app).get('/api/devices');

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ msg: 'No devices found' });
    });

    test('POST /api/devices - debería crear un nuevo dispositivo', async () => {
        (deviceService.createDevice as jest.Mock).mockResolvedValue(mockDevice);
    
        const response = await request(app)
            .post('/api/devices')
            .send({
                name: "Device 1",
                type: "Sensor",
                state: "Active",
                description: "A sensor device",
                stock: 10,
                image: "device1.jpg"
            });
    
        expect(response.status).toBe(201);
    
        const { id, createdAt, updatedAt, ...responseDevice } = response.body.device;
    
        expect(responseDevice).toEqual(mockDevice);
    });

    test('GET /api/devices - debería devolver una lista de dispositivos', async () => {
        (deviceService.getAllDevices as jest.Mock).mockResolvedValue([mockDevice]);
    
        const response = await request(app).get('/api/devices');
    
        expect(response.status).toBe(200);
    
    });

    test('POST /api/devices - debería devolver 400 si hay un error al crear', async () => {
        (deviceService.createDevice as jest.Mock).mockRejectedValue({
            msg: [
                { message: "Name is required", path: ["name"] },
                { message: "Type is required", path: ["type"] },
                { message: "Stock is required", path: ["stock"] }
            ]
        });
    
        const response = await request(app)
            .post('/api/devices')
            .send({});  // Enviar datos vacíos para forzar errores
    
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('msg');
        expect(Array.isArray(response.body.msg)).toBe(true);
        expect(response.body.msg.length).toBeGreaterThan(0);
    });
    
    

    test('PUT /api/devices/:id - debería devolver 404 si el dispositivo no existe', async () => {
        (deviceService.updateDevice as jest.Mock).mockRejectedValue(new Error('Device with id 999 not found'));
    
        const response = await request(app)
            .put('/api/devices/999')
            .send({ name: 'Updated Device' });
    
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ msg: 'Device with id 999 not found' });
    });

    test('PUT /api/devices/:id - debería actualizar un dispositivo', async () => {

        const createResponse = await request(app)
            .post('/api/devices')
            .send({
                name: "Device 3",
                type: "Sensor",
                state: "Active",
                description: "A sensor device",
                stock: 10,
                image: "device1.jpg"
            });
    

    
        
        const createdDeviceId = createResponse.body.device.id; 
    
        const updateResponse = await request(app)
            .put(`/api/devices/${createdDeviceId}`)
            .send({ name: "Updated Device" });
    
        expect(updateResponse.status).toBe(200);
        expect(updateResponse.body).toEqual({ msg: 'Device updated' });
    });
    
    test('PUT /api/devices/:id - debería devolver 400 si la actualización es inválida', async () => {

        const createResponse = await request(app)
            .post('/api/devices')
            .send({
                name: "Device 4",
                type: "Sensor",
                state: "Active",
                description: "A sensor device",
                stock: 10,
                image: "device1.jpg"
            });
    
        
    
        const createdDeviceId = createResponse.body.device.id; 
    
        const updateResponse = await request(app)
            .put(`/api/devices/${createdDeviceId}`)
            .send({ stock: -10 }); // Stock negativo
    
        expect(updateResponse.status).toBe(404);
        expect(updateResponse.body).toEqual({ msg: 'Validation error: Stock must be at least 1' });
    });
    
    
    

    test('DELETE /api/devices/:id - debería eliminar un dispositivo', async () => {
        const createResponse = await request(app)
            .post('/api/devices')
            .send({
                name: "Device 2",
                type: "Sensor",
                state: "Active",
                description: "A sensor device",
                stock: 10,
                image: "device1.jpg"
            });
    
        expect(createResponse.status).toBe(201);
        const deviceId = createResponse.body.device.id; 
    
        
        (deviceService.deleteDevice as jest.Mock).mockResolvedValue(undefined);
    
        const deleteResponse = await request(app).delete(`/api/devices/${deviceId}`);
    
        expect(deleteResponse.status).toBe(200);
        expect(deleteResponse.body).toEqual({ msg: 'Device deleted' });
    });

    test('DELETE /api/devices/:id - debería devolver 404 si el dispositivo no existe', async () => {
        (deviceService.deleteDevice as jest.Mock).mockRejectedValue(new Error('Device with id 999 not found'));
    
        const response = await request(app).delete('/api/devices/999');
    
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ msg: 'Device with id 999 not found' });
    });

    test('Debería eliminar todos los dispositivos y devolver un mensaje de éxito', async () => {
        (deviceService.deleteAllDevices as jest.Mock).mockResolvedValue(undefined);

        const response = await request(app).delete('/api/devices');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ msg: 'All devices deleted' });
    });
    
    
});
