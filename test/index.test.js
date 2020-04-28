process.env.NODE_ENV = 'test';
const app = require('../app');

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
// const checkStatus = require('./index.test.hooks').checkStatus;
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

describe('/data post routes tests', () => {
    describe('when users enters a valid data properties', () => {
        it('should return success message and status code 200 when data is valid', (done) => {
            let data = { name: 'Yusuff Ogundeji', marital_status: 'single and searching...', about: 'Fullstack Developer || Startup Enthusiast'};
            chai.request(app)
            .post('/data')
            .send(data)
            .end((err, res) => {
                res.should.have.status(200);
                expect(err).to.be.null;
                expect(res.body.message).equals('User data added successfully');
                res.body.should.have.property('message');
                res.should.have.property('status').equals(200);
                res.should.be.a('object');
                res.should.not.equal(null);
                done();
            });
        });
    });

    describe('when user enter the wrong data properties or none', () =>{
        it('should return error status code 400 and return failure message', (done) => {    
            let data = {};
            chai.request(app)
            .post('/data')
            .send(data)
            .end((err, res) => {
                res.should.have.status(400);
                expect(err).to.not.be.null;
                done();
            });
        })
    })
});