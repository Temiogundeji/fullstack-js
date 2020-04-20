var jwtSecret = require('./jwtConfig');
var bcrypt = require('bcrypt');

const BCRYPT_SALT_R = 12;

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../model/User');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
    'signup', 
    new localStrategy(
        //payload
        {
        emailField: 'email',
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
                if(user != null){
                    console.log('user already exists!');
                    return done(null, false, { message:'user already exists!' });
                }
                else{
                    bcrypt.hash(password, BCRYPT_SALT_R).then(hashed => {
                        User.create({email, password: hashed}).then(user => {
                            console.log('user successfully created!');
                            return done(null, user);
                        });
                    });
                }
            });
        }
        catch(error){
            done(error);
        }
    }
));

passport.use(
    'login',
    new localStrategy(
        //payload
        {
            emailField:'email',
            passwordField:'password',
            session: false
        },
        (email, password, done) => {
            try{
                User.findOne({
                    where: {
                        email: email
                    }
                })
                .then(user => {
                    if(user == null){
                        return done(null, false, { message: 'bad email'})
                    }
                    else{
                        bcrypt.compare(password, user.password)
                            .then(response => {
                                if(response != true){
                                    console.log('passwords do not match!');
                                    return done(null, false, { message: 'passwords do not match!'});
                                }
                                console.log('user found and authenticated!, welcome bro!');
                                return done(null, user);
                            })
                    }
                })
            }
            catch(err){
                done(error);
            }
        }
    )
);

// require('dotenv').config();
const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: jwtSecret
};

 console.log(opts);
passport.use(
    'jwt',
    new JWTStrategy(opts, (jwt_payload, done) => {
        try{
            User.findOne({
                where: {
                    email: jwt_payload.id
                }
            })
            .then(user => {
                if(user) {
                    console.log('user found in db in passport!');
                    done(null, user);
                }
            })
        }
        catch(err){
            done(err);
        }
    })
);

