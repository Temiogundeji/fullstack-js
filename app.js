const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('morgan');
const passport = require('passport');
const routes = require('./routes/routes');

const PORT = 3000;
require('./controller/auth');
require('dotenv').config();

app.use(express.json());
app.use(bodyParser.json());
app.use( bodyParser.urlencoded({ extended: true }) );
app.use(passport.initialize());

if(process.env.NODE_ENV !== 'test'){
    app.use(logger('dev'));
}

if(app.get('dev') === 'development'){
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    });
}

app.get('/', (req, res) => {
    res.json({ message: 'success', mood: 'Thankful'});
});

const data = { name: 'Yusuff Ogundeji', marital_status: 'single and searching...', about: 'Fullstack Developer || Startup Enthusiast'};
app.post('/data', (req, res) => {
    data = req.body;
    res.json({ message: 'Message successful!', status:res.statusCode, user: data });
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