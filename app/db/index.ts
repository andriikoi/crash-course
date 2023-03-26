import { Model, Sequelize } from 'sequelize';
import * as fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const DB_NAME = process.env.POSTGRES_DB || 'db';
const USER = process.env.POSTGRES_USER || 'user';
const PASSWORD = process.env.POSTGRES_PASSWORD || 'password';

const db: any = { entities: {} as Record<string, Model> };

const sequelize = new Sequelize(DB_NAME, USER, PASSWORD, {
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    dialect: 'postgres'
});

export const checkConnection = async (connection: Sequelize): Promise<boolean> => {
    try {
        await connection.authenticate();
        return true;
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        return false;
    }
};

checkConnection(sequelize)
    .then((result: boolean) => result && console.log('Connection has been established successfully.'));

const associationsFileName = 'associations.js';
fs
    .readdirSync(path.join(__dirname, 'entities'))
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== associationsFileName) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = require(path.join(__dirname, 'entities', file)).default(sequelize);
        db.entities[model.name] = model;
    });

// define associations
require(path.join(__dirname, 'entities', associationsFileName)).default(db.entities);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
