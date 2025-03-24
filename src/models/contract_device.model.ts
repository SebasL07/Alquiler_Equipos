import { DataTypes } from "sequelize";
import db from "../database/connect";
import Contract from "./contract.model";
import Device from "./device.model";

const ContractDevice = db.define('contract_device', {
    id_contract: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Contract,
            key: 'id'
        }
    },
    deviceName: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Device,
            key: 'name'
        }
    },
    rented_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    total_price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    delivery_status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Pending" // Puede ser 'Pending', 'Delivered', 'Returned', etc.
    }
});

export default ContractDevice;
