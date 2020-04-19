const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;
const sequelize = new Sequelize('userdb','temiogundeji','Temilorun123', {
    host:'localhost',
    dialect:'postgres',
});

const User = sequelize.define('user', {
    email: {
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    }
});

sequelize.sync().then(() => {
    console.log('Userdb and user table has been created successfully!');
});

    
    
module.exports = User;
