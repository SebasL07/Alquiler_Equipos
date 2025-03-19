import { Sequelize } from "sequelize";

const db = new Sequelize('alquiler', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

export default db;