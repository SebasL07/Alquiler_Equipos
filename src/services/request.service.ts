import Request from '../models/request.model';
import User from '../models/user.model';

class RequestService {
    public async getAllRequests() {
        return await Request.findAll();
    }

    public async getRequestById(id: number) {
        return await Request.findByPk(id);
    }

    public async createRequest(requestData: any) {
        const user = await User.findOne({where: {user_Document: requestData.user_Document}});
        if(!user) throw new Error(`User document ${requestData.user_Document} not found`);
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