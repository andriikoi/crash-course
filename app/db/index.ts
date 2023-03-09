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

    checkConnection(connection).then((result) => console.log(result));

    return connection;
};

const checkConnection = async (connection: Sequelize): Promise<string> => {
    try {
        await connection.authenticate();
        return 'Connection has been established successfully.';
    } catch (error) {
        console.error('Error:', error);
        return 'Unable to connect to the database';
    }
};

export default {
    connect,
    checkConnection
};
