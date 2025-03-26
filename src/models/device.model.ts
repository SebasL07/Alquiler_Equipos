import { Model, DataTypes } from "sequelize";
import sequelize from "../database/connect";

class Device extends Model {
    public name!: string;
    public type!: string;
    public state!: string;
    public description!: string;
    public stock!: number;
    public image!: string;
}

Device.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: "Name is required" },
                len: { args: [3, 255], msg: "Name must be between 3 and 255 characters" },
            },
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: "Type is required" },
                len: { args: [3, 255], msg: "Type must be between 3 and 255 characters" },
            },
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: "State is required" },
                len: { args: [3, 255], msg: "State must be between 3 and 255 characters" },
            },
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: "Description is required" },
                len: { args: [3, 255], msg: "Description must be between 3 and 255 characters" },
            },
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                notNull: { msg: "Stock is required" },
                min: { args: [1], msg: "Stock must be at least 1" },
            },
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: "Image is required" },
                len: { args: [3, 255], msg: "Image must be between 3 and 255 characters" },
            },
        },
    },
    {
        sequelize,
        modelName: "Device",
    }
);

export default Device;