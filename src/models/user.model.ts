import {DataTypes} from "sequelize";
import db from "../database/connect";

const User = db.define('user', {
    name: {
        type: DataTypes.STRING
    },

    user_Document:{
        type: DataTypes.STRING
    },

    email: {
        type: DataTypes.STRING
    },

    password: {
        type: DataTypes.STRING
    },

    cellphone: {
        type: DataTypes.INTEGER
    },

    adress: {
        type: DataTypes.STRING
    },


});

export default User;