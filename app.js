const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.listen(3000, () => console.log('server running at 3000'));

app.use((req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

let payload = {status: 'success'}
app.get('/', (req, res) =>{
    res.json(payload);
});

let payload2 =  {data: "My favorite data"};
app.post('/data', (req, res) =>{
    req.body = payload2;
    // payload2 = req.body;
    res.json(payload2);
    console.log(payload2);
    res.status(201).json({
        message: 'Data created successfully!'
    });
});

app.get('/data', (req, res)=>{
    res.json(payload2);
});

