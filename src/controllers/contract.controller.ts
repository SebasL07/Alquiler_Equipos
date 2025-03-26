import { Request, Response } from "express";
import { contractService } from "../services";

class ContractController {
    public async getContracts(req: Request, res: Response) {
        try {
            const contracts = await contractService.getAllContrats();
            if (contracts.length === 0) {
                res.status(404).json({ msg: 'No contracts found' });
            } else {
                res.json(contracts);
            }
        } catch (error: any) {
            res.status(500).json({ msg: error.message, error: error.message });
        }
    }

    public async getContract(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const contract = await contractService.getContractById(Number(id));
            if (contract) {
                res.json(contract);
            } else {
                res.status(404).json({ msg: `Contract with id ${id} not found` });
            }
        } catch (error: any) {
            res.status(500).json({ msg: error.message, error: error.message });
        }
    }

    public async postContract(req: Request, res: Response) {
        try {
            const contract = await contractService.createContract(req.body);
            res.status(201).json({ msg: 'Contract created', contract });
        } catch (error: any) {
            res.status(400).json({ msg: error.message });
        }
    }

    public async putContract(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const updatedContract = await contractService.updateContract(Number(id), req.body);
            res.status(200).json({ msg: 'Contract updated', updatedContract });
        } catch (error: any) {
            res.status(404).json({ msg: error.message });
        }
    }

    public async deleteContract(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await contractService.deleteContract(Number(id));
            res.status(200).json({ msg: 'Contract deleted' });
        } catch (error: any) {
            res.status(404).json({ msg: error.message });
        }
    }

    public async deleteAllContract(req: Request, res: Response) {
                try {
                    await contractService.deleteAllContract();
                    res.status(200).json({ msg: 'All contracts deleted' });
                } catch (error: any) {
                    res.status(500).json({ msg: error.message });
                }
            }
}

export const contractController = new ContractController();
