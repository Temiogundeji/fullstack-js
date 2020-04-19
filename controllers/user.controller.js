const User = require('../model/User');
module.exports  = {
    getUserByEmail: function (email) {
       return User.findOne({ where: {'email': email}})
    }
}
