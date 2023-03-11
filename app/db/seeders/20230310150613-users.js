'use strict';
const { v1: uuid } = require('uuid');

/** @type {import('sequelize-cli').Migration} */

module.exports = {
    async up (queryInterface, Sequelize) {
        return queryInterface.bulkInsert('users', Array.from(new Array(20)).map((_, index) => ({
            id: uuid(),
            username: `username${index}`,
            password: 'password',
            email: `example${index}@mail.com`,
            createdAt: new Date(),
            updatedAt: new Date()
        })));
    },

    async down (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('users', null, {});
    }
};
