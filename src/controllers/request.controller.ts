import { Request, Response } from "express";
import { requestService } from "../services";

class RequestController {
    public async getRequests(req: Request, res: Response) {
        try {
            const requests = await requestService.getAllRequests();
            if (requests.length === 0) {
                res.status(404).json({ msg: 'No requests found' });
            } else {
                res.json(requests);
            }
        } catch (error: any) {
            res.status(500).json({ msg: error.message });
        }
    }

    public async getRequest(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const request = await requestService.getRequestById(Number(id));
            if (request) {
                res.json(request);
            } else {
                res.status(404).json({ msg: `Request with id ${id} not found` });
            }
        } catch (error: any) {
            res.status(500).json({ msg: error.message });
        }
    }

    public async postRequest(req: Request, res: Response) {
        try {
            const request = await requestService.createRequest(req.body);
            res.status(201).json({ msg: 'Request created', request });
        } catch (error: any) {
            res.status(400).json({ msg: error.message });
        }
    }

    public async putRequest(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await requestService.updateRequest(Number(id), req.body);
            res.status(200).json({ msg: 'Request updated' });
        } catch (error: any) {
            res.status(404).json({ msg: error.message });
        }
    }

    public async deleteRequest(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await requestService.deleteRequest(Number(id));
            res.status(200).json({ msg: 'Request deleted' });
        } catch (error: any) {
            res.status(404).json({ msg: error.message });
        }
    }

    public async deleteAllRequest(req: Request, res: Response) {
            try {
                await requestService.deleteAllRequest();
                res.status(200).json({ msg: 'All request deleted' });
            } catch (error: any) {
                res.status(500).json({ msg: error.message });
            }
        }
}

export const requestController = new RequestController();