const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('morgan');
const passport = require('passport');
const routes = require('./routes/routes');

const PORT = 3000;
require('./controller/auth');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;
console.log(secretKey);

app.use(express.json());
app.use(bodyParser.json());
app.use( bodyParser.urlencoded({ extended: true }) );
app.use(logger('dev'));
app.use(passport.initialize());

app.get('/', (req, res) => {
    res.json({ message: 'success', mood: 'Thankful'});
});

const data = { name: 'Yusuff Ogundeji', marital_status: 'single and searching...', about: 'Fullstack Developer || Startup Enthusiast'};
app.post('/data', (req, res) => {
    req.body = data;
    res.json({ message: 'User added successfully', user: data});
});

app.get('/data', (req, res) => {
    res.json({ message: 'User retrieved successfully', user: data });
});

app.use('/user', routes);

app.use((err, req, res, next) => {
    res.status( err.status || 500 );
    res.json({ error: err });
});



app.listen(PORT, ()=>{
    console.log(`App running at ${PORT}`);
})

module.exports = app;