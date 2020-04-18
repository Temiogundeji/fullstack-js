const User = require('../model/User');
const queries = {
    getUserByEmail: function (email) {
       return User.findOne({ where: {'email': email}})
    }
}

module.exports = queries;