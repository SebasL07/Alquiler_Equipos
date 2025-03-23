import { Model, DataTypes } from "sequelize";
import sequelize from "../database/connect";

class Device extends Model {
    public id!: number;
    public name!: string;
    public stock!: number; // Add the stock property
}

Device.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        stock: {
            type: DataTypes.INTEGER, // Define stock as an integer
            allowNull: false,
            defaultValue: 0,
        },
    },
    {
        sequelize,
        modelName: "Device",
    }
);

export default Device;