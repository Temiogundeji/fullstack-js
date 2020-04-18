const User = require('../model/User');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    res.json({
        message: "successful!"
    });
});

const validateUser = (user) => {
    const validateEmail =  typeof user.email == 'string' && user.password.trim() != '';
    const validatePassword = typeof user.password == 'string' && user.password.trim() != '';
    return validateEmail && validatePassword;
}

router.post('/signup', (req, res) => {
    const { email, password } = req;
    if(validateUser(req.body)){
        User.getUserByEmail(email)
            .then(user => {
                console.log('user',user);
                if(!user){
                    // bcrypt.hash(password, 10)
                    //     .then((hash) => {
                    //         res.json({
                    //         message: "user successfully created!",
                    //         hash
                    //     });
                    // })
                    res.json({message:'success'});
                }
                else{
                    return new Error("user already exist!");
                }
            })       
    }
    // else{
    //     next(new Error('Invalid User!'))
    // }
});

router.post('/auth', (req, res)=>{

});

router.post('/login', (req, res) => {

});

module.exports = router;