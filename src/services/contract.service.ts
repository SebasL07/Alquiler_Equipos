import Contract from '../models/contract.model';
import User from '../models/user.model';

class ContractService {
    public async getAllContrats() {
        return await Contract.findAll();
    }

    public async getContractById(id: number) {
        return await Contract.findByPk(id);
    }
    public async createContract(contractData: any) {
        const user = await User.findOne({ where: { user_Document: contractData.user_Document } });
        
        if (!user) {
            throw new Error(`User document ${contractData.user_Document} not found`);
        }
    
        contractData.date_Start = contractData.date_Start instanceof Date ? contractData.date_Start : new Date(contractData.date_Start);
        contractData.date_Finish = contractData.date_Finish instanceof Date ? contractData.date_Finish : new Date(contractData.date_Finish);
    
        return await Contract.create(contractData);
    }

    public async updateContract(id: number, contractData: any) {
        const contract = await Contract.findByPk(id);
        if (!contract) throw new Error(`Request with id ${id} not found`);
        await contract.update(contractData);
        return contract;
    }

    public async deleteContract(id: number) {
        const contract = await Contract.findByPk(id);
        if (!contract) throw new Error(`Request with id ${id} not found`);
        await contract.destroy();
    }
}
export const contractService = new ContractService();