import { Sequelize } from "sequelize";

const db = new Sequelize('alquiler', 'root', '', {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql'
});

export default db;