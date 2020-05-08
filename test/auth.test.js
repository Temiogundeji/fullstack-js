process.env.NODE_ENV = 'test';

const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

describe('testing /user/login', () => {
    it('should return status code 200 when valid data is received successfully!', (done) => {
        const new_user = {
            "email": "midetobi@gmail.com",
            "password": "midetobi"
        };
        
        chai.request(app)
            .post('/user/signup')
            .send(new_user)
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body.message).to.equal('Signup successful');
                expect(res.body).to.have.property('session');
                expect(res).to.be.json;
                done();
            });
        });
    it('should return status code 400 when one or more parameter is missing', (done) => {
        const new_user = {
            "email":"andresiniesta@gmail.com"
        };
        chai.request(app)
        .post('/user/signup')
        .send(new_user)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
        });

        it('should return a response code 400 when signup parameter is null', (done) => {
            const new_user = {
                "email": null,
                "password": null
            };
            chai.request(app)
            .post('/user/login')
            .send(new_user)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
            });
    });
describe('testing /user/login', () => {
    // this.timeout(0);
    it('should return a response code 200 when user successfully login with correct data', (done) => {
        const user = {
            "email": "midetobi@gmail.com",
            "password": "midetobi"
        };
        
        chai.request(app)
            .post('/user/login')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                expect(res).to.be.json;
                done();
            });
        });
    it('should return a response code 400 when login parameter is incorrect data', (done) => {
        const user = {
            "email":"andresiniesta@gmail.com"
        };
        chai.request(app)
        .post('/user/login')
        .send(user)
            .end((err, res) => {
                res.should.have.status(400);
                expect(res.body).to.have.property('message').equals('Login unsuccessful, enter the correct username or password!');
                expect(res).to.be.json;
                done();
            });
        });

        it('should return a response code 400 when login parameter is incorrect data', (done) => {
            const user = {
                "email": null,
                "password": null
            };
            chai.request(app)
            .post('/user/login')
            .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    expect(res.body).to.have.property('message').equals('Login unsuccessful, enter the correct username or password!');
                    expect(res).to.be.json;
                    done();
                });
            }); 
    }); 
