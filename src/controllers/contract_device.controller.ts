import { Request, Response } from "express";
import { contractDeviceService } from "../services";

class ContractDeviceController {
    public async getAllContractDevices(req: Request, res: Response) {
        try {
            const contractDevices = await contractDeviceService.getAllContractDevices();
            res.json(contractDevices);
        } catch (error: any) {
            res.status(500).json({ msg: error.message, error: error.message });
        }
    }

    public async getContractDeviceById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const contractDevice = await contractDeviceService.getContractDeviceById(Number(id));
            res.json(contractDevice);
        } catch (error: any) {
            res.status(404).json({ msg: error.message });
        }
    }

    public async createContractDevice(req: Request, res: Response) {
        try {
            const contractDevice = await contractDeviceService.createContractDevice(req.body);
            res.status(201).json({ msg: "Contract device created", contractDevice });
        } catch (error: any) {
            res.status(400).json({ msg: error.message });
        }
    }

    public async updateContractDevice(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await contractDeviceService.updateContractDevice(Number(id), req.body);
            res.status(200).json({ msg: "Contract device updated" });
        } catch (error: any) {
            res.status(404).json({ msg: error.message });
        }
    }

    public async deleteContractDevice(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await contractDeviceService.deleteContractDevice(Number(id));
            res.status(200).json({ msg: "Contract device deleted" });
        } catch (error: any) {
            res.status(404).json({ msg: error.message });
        }
    }


    public async deleteAllContractDevice(req: Request, res: Response) {
                try {
                    await contractDeviceService.deleteAllContractDevice();
                    res.status(200).json({ msg: 'All contractDevices deleted' });
                } catch (error: any) {
                    res.status(500).json({ msg: error.message });
                }
            }
}

export const contractDeviceController = new ContractDeviceController();
