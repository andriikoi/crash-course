'use strict';
const bcrypt = require('bcrypt');
const { v4: uuidV4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */

module.exports = {
    async up (queryInterface, Sequelize) {
        const passwordHash = await bcrypt.hash('password', 10);
        return queryInterface.bulkInsert('users', Array.from(new Array(20)).map((_, index) => ({
            id: uuidV4(),
            username: `username${index}`,
            password: passwordHash,
            email: `example${index}@mail.com`,
            createdAt: new Date(),
            updatedAt: new Date()
        })));
    },

    async down (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('users', null, {});
    }
};
