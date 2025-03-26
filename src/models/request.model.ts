import { DataTypes } from "sequelize";
import db from "../database/connect";

const Request = db.define('request', {
    user_Document: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date_Request: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Pending"  // Puede ser 'Pending', 'Approved', 'Rejected', etc.
    },
    admin_comment: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

export default Request; 
