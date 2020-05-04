const User = require('../model/User');
const bcrypt = require('bcrypt');

const validatePwd = (password) => {
    let compare = bcrypt.compare(password, User.password);
    return compare;
}

module.exports = validatePwd; 
