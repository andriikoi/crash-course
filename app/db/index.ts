import { Sequelize } from 'sequelize';

const connect = () => {
    const DB_NAME = process.env.POSTGRES_DATABASE || 'db';
    const USER = process.env.POSTGRES_USER || 'user';
    const PASSWORD = process.env.POSTGRES_PASSWORD || 'password';

    const connection = new Sequelize(DB_NAME, USER, PASSWORD, {
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        dialect: 'postgres'
    });

    checkConnection(connection).then((result) => result && console.log('Connection has been established successfully.'));

    return connection;
};

const checkConnection = async (connection: Sequelize): Promise<boolean> => {
    try {
        await connection.authenticate();
        return true;
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        return false;
    }
};

export default {
    connect,
    checkConnection
};
