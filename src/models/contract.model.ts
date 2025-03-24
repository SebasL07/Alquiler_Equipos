import { DataTypes } from "sequelize";
import db from "../database/connect";

const Contract = db.define('contract', {
    user_Document: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date_Start: {
        type: DataTypes.DATE,
        allowNull: false
    },

    date_Finish: {
        type: DataTypes.DATE,
        allowNull: false
    },

    monthly_Value: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Pending"  // Puede ser 'Active' o 'Finish' o 'Pending'
    },
    contract:{
        type: DataTypes.STRING,
        allowNull: false,
    },

    client_signature:{
        type: DataTypes.STRING,
        allowNull: true
    }
    
});

export default Contract; 