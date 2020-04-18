const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const logger = require('morgan');
const userController = require('./controllers/user.controller');
const userRoutes = require('./routes/user.routes');

app.use((req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use('/user', userRoutes);

app.listen(3000, () => console.log('server running at 3000'));