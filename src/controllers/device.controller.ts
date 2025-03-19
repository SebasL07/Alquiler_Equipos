import { Request, Response } from 'express';
import { deviceService } from '../services/device.service';

class DeviceController {
    public async getDevices(req: Request, res: Response) {
        try {
            const devices = await deviceService.getAllDevices();
            if (devices.length === 0) {
                res.status(404).json({ msg: 'No devices found' });
            } else {
                res.json(devices);
            }
        } catch (error: any) {
            res.status(500).json({ msg: 'Server error' });
        }
    }

    public async getDevice(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const device = await deviceService.getDeviceById(Number(id));
            if (device) {
                res.json(device);
            } else {
                res.status(404).json({ msg: `Device with id ${id} not found` });
            }
        } catch (error: any) {
            res.status(500).json({ msg: 'Server error' });
        }
    }

    public async postDevice(req: Request, res: Response) {
        try {
            const device = await deviceService.createDevice(req.body);
            res.status(201).json({ msg: 'Device created', device });
        } catch (error: any) {
            res.status(400).json({ msg: error.message });
        }
    }

    public async putDevice(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await deviceService.updateDevice(Number(id), req.body);
            res.status(200).json({ msg: 'Device updated' });
        } catch (error: any) {
            res.status(404).json({ msg: error.message });
        }
    }

    public async deleteDevice(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await deviceService.deleteDevice(Number(id));
            res.status(200).json({ msg: 'Device deleted' });
        } catch (error: any) {
            res.status(404).json({ msg: error.message });
        }
    }
}

export const deviceController = new DeviceController();
