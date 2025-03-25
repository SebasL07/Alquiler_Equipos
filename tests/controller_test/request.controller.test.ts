import request from 'supertest';
import { app } from '../../src/app'; 
import bcrypt from 'bcrypt';
import { requestService, userService } from '../../src/services';
import User from '../../src/models/user.model';

jest.mock('../../src/services'); // Mockeamos el servicio

describe('RequestController', () => {
    const mockRequest = {
        id: 1,
        user_Document: "123456789",
        request_type: "Support",
        status: "Pending",
        description: "Need assistance",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    beforeEach(async () => {
        jest.clearAllMocks();
        await requestService.deleteAllRequest();
    });

    test('GET /api/requests - debería devolver 404 si no hay solicitudes', async () => {
        (requestService.getAllRequests as jest.Mock).mockResolvedValue([]);

        const response = await request(app).get('/api/requests');

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ msg: 'No requests found' });
    });

    test('POST /api/requests - debería crear una nueva solicitud', async () => {
        (requestService.createRequest as jest.Mock).mockResolvedValue(mockRequest);
        const response = await request(app)
        .post('/api/requests')
        .send({
            user_Document: "987654321", 
            date_Request: new Date().toISOString(), // Fecha válida
            status: "Pending",
            admin_comment: null
        })

        expect(response.status).toBe(201);

        
   
       
    });
    
    

    test('GET /api/requests - debería devolver una lista de solicitudes', async () => {
        (requestService.getAllRequests as jest.Mock).mockResolvedValue([mockRequest]);

        const response = await request(app).get('/api/requests');

        expect(response.status).toBe(200);
        expect(response.body).toEqual([mockRequest]);
    });

    test('GET /api/requests/:id - debería devolver una solicitud por ID', async () => {
        (requestService.getRequestById as jest.Mock).mockResolvedValue(mockRequest);

        const response = await request(app).get(`/api/requests/1`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockRequest);
    });

    test('GET /api/requests/:id - debería devolver 404 si la solicitud no existe', async () => {
        (requestService.getRequestById as jest.Mock).mockResolvedValue(null);

        const response = await request(app).get(`/api/requests/999`);

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ msg: 'Request with id 999 not found' });
    });

    test('POST /api/requests - debería devolver 400 si falta un campo', async () => {
        (requestService.createRequest as jest.Mock).mockRejectedValue(new Error('User document is required'));

        const response = await request(app)
            .post('/api/requests')
            .send({
                request_type: "Support",
                status: "Pending",
                description: "Need assistance",
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

    test('PUT /api/requests/:id - debería actualizar una solicitud', async () => {
        (requestService.updateRequest as jest.Mock).mockResolvedValue(mockRequest);

        const response = await request(app)
            .put(`/api/requests/1`)
            .send({ status: "Approved" });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ msg: 'Request updated' });
    });

    test('PUT /api/requests/:id - debería devolver 404 si la solicitud no existe', async () => {
        (requestService.updateRequest as jest.Mock).mockRejectedValue(new Error('Request with id 999 not found'));

        const response = await request(app)
            .put('/api/requests/999')
            .send({ status: "Approved" });

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ msg: 'Request with id 999 not found' });
    });

    test('DELETE /api/requests/:id - debería eliminar una solicitud', async () => {
        (requestService.deleteRequest as jest.Mock).mockResolvedValue(undefined);

        const response = await request(app).delete(`/api/requests/1`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ msg: 'Request deleted' });
    });

    test('DELETE /api/requests/:id - debería devolver 404 si la solicitud no existe', async () => {
        (requestService.deleteRequest as jest.Mock).mockRejectedValue(new Error('Request with id 999 not found'));

        const response = await request(app).delete('/api/requests/999');

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ msg: 'Request with id 999 not found' });
    });

   /** test('DELETE /api/requests - debería eliminar todas las solicitudes', async () => {
        (requestService.deleteAllRequest as jest.Mock).mockResolvedValue(undefined);

        const response = await request(app).delete('/api/requests');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ msg: 'All request deleted' });
    }); */
});
