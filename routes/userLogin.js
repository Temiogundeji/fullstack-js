// const router = require('express').Router;
const User = require('../model/User');
const jwtSecretkey = require('../config/jwtConfig');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const dotenv = require('dotenv');
module.exports = (app) =>{
    app.get('loginUser', (req, res, next) => {
        passport.authenticate('login', (err, user, info) => {
            if(err){
                console.log(err);
            }
            if(info != undefined){
                console.log(info.message);
                JSON.send(info.message);
            }
            else{
                req.logIn(user, err => {
                    User.findOne({
                        where: {
                            email: user.email
                        }
                    })
                    .then(user => {
                        const token = jwt.sign({ id: user.email }, jwtSecretkey.secret);
                        res.json(200).send({
                            auth: true,
                            token: token,
                            message: 'user login successfully!'
                        })
                    })
                })
            }
        })(req, res, next);
    });
}