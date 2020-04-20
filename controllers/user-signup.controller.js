const passport = require('passport');
const User = require('../model/User');

const signup = (req, res, next) => {
    passport.authenticate('signup', (err, user, info) => {
        if(err){
            console.log(err);
        }
        if(info != undefined){
            console.log(info.message);
            res.send(info.message);
        }
        else{
            req.logIn(user, err => {
                const data = {
                    email: req.body.email,
                    password: req.body.password
                };
                User.findOne({
                    where: {
                        email: data.email
                    }
                })
                .then(user => {
                    user.update({
                        email:data.email,
                        password:data.password
                    })
                    .then(() => {
                        console.log('user has been created successfully!');
                        res.status(200).send({message: 'user created!'})
                    });
                })
            })
        }
    })(req, res, next);
}

module.exports = signup;