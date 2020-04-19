const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const logger = require('morgan');
var cors = require('cors');
var passport = require('passport');
const userController = require('./controllers/user.controller');
const userLoginRoute = require('./routes/userLogin');
const userRegisterRoute = require('./routes/userRegister');
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

require('./routes/userLogin')(app);
require('./routes/userRegister')(app);

// app.use('/user', userLoginRoute);
// app.use('/user', userRegisterRoute);
app.use(passport.initialize());



app.listen(3000, () => console.log('server running at 3000'));