const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const router = express.Router();

router.post('/signup', passport.authenticate('signup', {session: false}), (req, res, next) => {
   const { id, email } = req.body;
   const body = { id:id, email: email };
   const token = jwt.sign({ user: body }, process.env.SECRET_KEY);
   console.log(process.env.SECRET_KEY);

   try{
    res.json({
        message:'Signup successful',
        user:req.user,
        session: token
    })
   }
   catch(err){
       res.json({error:err, message: 'Signup successful!'});
   }
});

router.post('/login', (req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
       try{
            if(err || !user){
                const error = new Error('An error occured');
                return next(error);
            }
            req.login(user, {session: false}, (error) => {
                if(error){
                    return next(error);
                }
                const { id, email } = user;
                const body = {id: id, email:email };
                const token = jwt.sign({ user: body}, process.env.SECRET_KEY);
                
                res.json({ session: token, message: 'User login successful!'})
            });
       }
       catch(err){
        //    return next(err);
        res.json({error: err, message: 'User login unsuccessful!'});
       }
    })(req, res, next)
});

module.exports = router;