const Sequelize = require('sequelize');
const UserModel =  require('./User');

require('dotenv').config();
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PKEY, {
    host: 'localhost',
    dialect: process.env.DIALECT
});

const User = UserModel(sequelize, Sequelize.DataTypes);

sequelize.sync()
    .then(() => {
        console.log('Database and Tables created!');
});
console.log(process.env.DB_NAME,process.env.DB_USER, process.env.DB_PKEY);
module.exports = {
    User
}