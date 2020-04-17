const sequelize = require('./DB');

const Model = sequelize.Model;
class User extends Model{}

User.init({
    email:{
        unique:true,
        type: sequelize.STRING,
        allowNull:false,
        validate:{
            isEmail:true,
            notNull:{
                msg: "Please enter a valid email!"
            }
        }

    },
    password:{
        type:sequelize.STRING,
        allowNull:false,
        validate: {
            notNull: {
                msg:"Please enter a password!"
            }
        }
    }
}, { sequelize });



