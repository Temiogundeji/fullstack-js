const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const logger = require('morgan');
var cors = require('cors');
var passport = require('passport');

const login = require('./controllers/user-login.controller');
const signup = require('./controllers/user-signup.controller');

require('./config/passport');


app.use((req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(cors);
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(passport.initialize());

app.get('/user', login);
app.post('/user', signup);

app.listen(3000, () => console.log('server running at 3000'));

module.exports = app;