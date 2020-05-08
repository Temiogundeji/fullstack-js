const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
// const User = require('../model/User');
const SeqModel = require('../model/Config')
const bcrypt = require('bcrypt');
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
            SeqModel.User.findOne({
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
                        SeqModel.User.create({email: email, password: hashed}).then( user => {
                            return done(null, user, {message: 'User created successfully!'});
                            
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
       const user = await SeqModel.User.findOne({ where: { email:email } });
        if(!user){
            return done(null, falase, {message: 'User not found!'})
        }

        bcrypt.compare(password, user.password)
        .then((res) => {
            if(res === true) {
                return done(null, user, {message: 'Logged in successfully!'});
            }
            else{
                return done(null, false, {message: 'Wrong password!'});
            }
        });
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
