import { Sequelize } from 'sequelize';

export const checkConnection = async (connection: Sequelize): Promise<boolean> => {
    try {
        await connection.authenticate();
        return true;
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        return false;
    }
};
