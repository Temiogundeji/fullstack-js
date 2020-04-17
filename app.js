const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use((req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

let payload = null;
app.get('/', (req, res) =>{
    payload = req.body;
    res.json({status:"success"});
});

app.post('/data', (req, res) =>{
    payload = req.body;
    res.json(payload);
    console.log(payload);
    res.status(201).json({
        message: 'Data created successfully!',data:payload
    });
});

app.get('/data', (req, res)=>{
    res.json({success:"true", message:"Data returned successfully!"});
});

app.listen(3000, () => console.log('server running at 3000'));
