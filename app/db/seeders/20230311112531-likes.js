'use strict';

const getRandomValue = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const {v1: uuid} = require('uuid');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = await queryInterface.select(null, 'users');
    const posts = await queryInterface.select(null, 'posts');

    const likes = [];

    for (const { id: postId } of posts) {
      Array.from(new Array(getRandomValue(0, 5))).forEach(() => {
        const randUserIndex = getRandomValue(0, 19);
        const {id: userId} = users[randUserIndex];

        const isSameLikeExist = Boolean(likes.find((like) => like.userId === userId && like.postId === postId));

        !isSameLikeExist && likes.push({
          id: uuid(),
          userId,
          postId,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      });
    }

    return queryInterface.bulkInsert('likes', likes);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('likes', null, {});
  }
};
