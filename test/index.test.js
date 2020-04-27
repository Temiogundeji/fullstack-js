process.env.NODE_ENV = 'test';
const app = require('../app');

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

describe('/ route tests', () => {
    describe('Testing status code and response type', () =>{
        it('should return a response code 200 and response type json', (done) => {
            chai.request(app)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200);
                    expect(res).to.be.json;
                    expect(err).to.be.null;
                    done();
                });
            });
    });
    
    describe('Testing type and res body', () =>{
        it('should return a string', (done) => {
            chai.request(app)
                .get('/')
                .end((err, res) => {
                    res.body.should.have.property('message');
                    res.body.should.have.property('mood');
                    expect(res.body.message).equals('success');
                    expect(res.body.mood).equals('Thankful');
                    done();
                });
            });
    });
});

// describe('/data routes tests')