const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('morgan');
const passport = require('passport');
const routes = require('./routes/routes');

const PORT = 3000;
require('./controller/auth');


app.use(express.json());
app.use(bodyParser.json());
app.use( bodyParser.urlencoded({ extended: true }) );
app.use(logger('dev'));
app.use(passport.initialize());

app.use((err, req, res, next) => {
    res.status( err.status || 500 );
    res.json({ error: err });
});

app.use('/user', routes);


app.listen(PORT, ()=>{
    console.log(`App running at ${PORT}`);
})