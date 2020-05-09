process.env.NODE_ENV === "test";
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
            email: {
                type: DataTypes.STRING,
                unique:true,
                allowNull:false,
                isEmail:true
            },
            password:{
                type: DataTypes.STRING,
                allowNull:false
            }
        },
        {
            instanceMethods: {
                comparePassword : (password) => {
                    return bcrypt.compare(password, this.password);
                }
            }
        }
    );

    return User;
}
    