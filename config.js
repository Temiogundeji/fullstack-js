require('dotenv').config();

module.exports = {

    development:{
        database: 'userdb',
        username: 'temiogundeji',
        password: 'Temilorun123',
        host:'localhost',
        dialect: 'postgres'
    },

    test:{
        database: 'userdb_test',
        username: 'temiogundeji',
        password: null,
        host: 'localhost',
        dialect: 'postgres'

    }
}