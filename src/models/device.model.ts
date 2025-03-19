import { DataTypes } from "sequelize";
import db from "../database/connect";

const Device = db.define('device', {
    name: {
        type: DataTypes.STRING,
    },
    type: {
        type: DataTypes.STRING,
    },
    state: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING
    },
    stock: {
        type: DataTypes.INTEGER,
    },
    image: {
        type: DataTypes.STRING
    }
});

export default Device;
