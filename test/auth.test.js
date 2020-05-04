const app = require('../app');
const auth = require('../controller/auth');
const routes = require('../routes/routes');
const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();
const expect = chai.expect;

const User = require('../model/User');
describe(' testing /user/signup', () => {
    beforeEach((done) => {

        done();
    })
    it('should return status code 200 when data is received successfully!', (done) => {
        
    });
});

