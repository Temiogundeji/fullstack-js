 const Sequelize = require('sequelize');
 const sequelize = new Sequelize('userdb', 'temiogundeji','Temilorun123', {
     host:'localhost',
     dialect:'postgres'
 });

 sequelize.authenticate()
    .then(()=>{
        console.log('connection has been created successfully!');
    })
    .catch(err => {
        console.error('Unable to connect to the database', err);
    });

    module.exports = sequelize;