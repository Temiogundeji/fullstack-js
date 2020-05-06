module.exports  = (sequelize, type) => {
    return sequelize.define('user', {
        email: {
            type: type.STRING,
            unique:true,
            allowNull:false,
            isEmail:true
        },
        password:{
            type: type.STRING,
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
}