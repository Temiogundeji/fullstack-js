require('dotenv').config();
process.env.NODE_ENV='test';

const Sequelize = require('sequelize');
const UserModel =  require('./user');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PKEY, {
    host: 'localhost',
    dialect: process.env.DIALECT
});

const User = UserModel(sequelize, Sequelize.DataTypes);

sequelize.sync()
    .then(() => {
        console.log('Database and Tables created!');
});

module.exports = {
    User
}