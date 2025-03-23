import { Request, Response } from "express";
import { requestDeviceService } from "../services";

class RequestDeviceController {
    public async getRequestDevices(req: Request, res: Response) {
        try {
            const requestDevices = await requestDeviceService.getAllRequestDevices();
            if (requestDevices.length === 0) {
                res.status(404).json({ msg: 'No request devices found' });
            } else {
                res.json(requestDevices);
            }
        } catch (error: any) {
            res.status(500).json({ msg: 'Server error' });
        }
    }

    public async getRequestDevice(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const requestDevice = await requestDeviceService.getRequestDeviceById(Number(id));
            if (requestDevice) {
                res.json(requestDevice);
            } else {
                res.status(404).json({ msg: `Request device with id ${id} not found` });
            }
        } catch (error: any) {
            res.status(500).json({ msg: 'Server error' });
        }
    }

    public async postRequestDevice(req: Request, res: Response) {
        try {
            const requestDevice = await requestDeviceService.createRequestDevice(req.body);
            res.status(201).json({ msg: 'Request device created', requestDevice });
        } catch (error: any) {
            res.status(400).json({ msg: error.message });
        }
    }

    public async putRequestDevice(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await requestDeviceService.updateRequestDevice(Number(id), req.body);
            res.status(200).json({ msg: 'Request device updated' });
        } catch (error: any) {
            res.status(404).json({ msg: error.message });
        }
    }

    public async deleteRequestDevice(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await requestDeviceService.deleteRequestDevice(Number(id));
            res.status(200).json({ msg: 'Request device deleted' });
        } catch (error: any) {
            res.status(404).json({ msg: error.message });
        }
    }
}

export const requestDeviceController = new RequestDeviceController();
