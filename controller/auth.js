const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../model/User');
const bcrypt = require('bcrypt');
const validatePwd = require('../utils/model-hooks');
require('dotenv').config();
const BCRYPT_SALT_R = 12;

passport.use('signup', new localStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        session: false
    },
    (email, password, done) => {
        try {
            User.findOne({
                where: {
                    email: email
                }
            })
            .then(user => {
                if(user){
                    try{
                        console.log('User already exists!');
                    }
                    catch(err){
                        done(err);
                    }
                }
                else{
                    bcrypt.hash(password, BCRYPT_SALT_R)
                    .then(hashed => {
                        User.create({email: email, password: hashed}).then( user => {
                            return done(null, user);
                            
                        })
                    })
                }
            })
        }
        catch(err){
            console.log(err);
            done(err);
        }
    }
));

passport.use('login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async(email, password, done) => {
    
    try{
       const user = await User.findOne({
            where: {
                email:email
            }       
        }); 
        const validatePwd = await bcrypt.compare(user.password, password);
        if(!user){
            return done(null, false, {message: 'User not found!'});
        }
        if(!validatePwd){
            return done(null, false, {message: 'Wrong Password!'});
        }
        else{
            return done(null, user, {message: 'Logged in successfully!'});
        }
    }
    catch(err){
        console.error(err);
        return done(err);
    }
}));

const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(new JWTStrategy({
    secretOrKey: process.env.SECRET_KEY,
    jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
},(token, done) => {
    try {
        return done(null, token.user);
    }
    catch(err){
        done(err);
    }
}));
