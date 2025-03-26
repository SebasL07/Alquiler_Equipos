import { DataTypes } from "sequelize";
import db from "../database/connect";
import Request from "./request.model"; 
import Device from "./device.model"; // Importamos el modelo Device

const RequestDevice = db.define('request_device', {
    request_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Request, // Relacionado con una solicitud
            key: 'id'
        }
    },
    deviceName: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Device, // Relacionado con un dispositivo
            key: 'name'
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
    
});


export default RequestDevice;
