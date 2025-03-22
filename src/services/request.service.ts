import Request from '../models/request.model';

class RequestService {
    public async getAllRequests() {
        return await Request.findAll();
    }

    public async getRequestById(id: number) {
        return await Request.findByPk(id);
    }

    public async createRequest(requestData: any) {
        return await Request.create(requestData);
    }

    public async updateRequest(id: number, requestData: any) {
        const request = await Request.findByPk(id);
        if (!request) throw new Error(`Request with id ${id} not found`);
        await request.update(requestData);
        return request;
    }

    public async deleteRequest(id: number) {
        const request = await Request.findByPk(id);
        if (!request) throw new Error(`Request with id ${id} not found`);
        await request.destroy();
    }
}
export const requestService = new RequestService();