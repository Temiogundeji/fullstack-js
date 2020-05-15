process.env.NODE_ENV = 'test';
const app = require('../app');

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);
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

describe('/post tests', function() {
    it('should return a status code of 200 when correct parameters are set', (done) => {
        const data = {
            name:'Yusuff',
            ms:'Single and searching!',
            about:'I am a Fullstack Software Engineer'
        }
        chai.request(app)
        .post('/data')
        .send(data)
        .end((err, res) => {
            expect(res.status).to.equal(200);
            done();
        });
    });
    it('should return a status code of 400 when incorrect/incomplete parameters are set', (done) => {
        const data = {
            name: 'Ogundeji',
            about: 'I am a Fullstack Engineer'
        };
        chai.request(app)
        .post('/data')
        .send(data)
        .end((err, res) => {
            expect(res.status).to.equal(400);
            res.body.should.have.property('message').equal('Invalid user data passed');
            done();
        });
    });
    it('should return status code 400 when string is pass as data', (done) => {
        let data = "";
        chai.request(app)
        .post('/data')
        .send(data)
        .end((err, res) => {
            expect(res.status).to.equal(400);
            res.body.should.have.property('message').equal('Invalid user data passed');
            done();
        });
    });
    it('should return a status code 200 when data is received successfully!', (done) => {
        chai.request(app)
        .get('/data')
        .end((err, res) => {
            expect(res.status).to.equal(200);
            res.body.should.have.property('message').equal('User retrieved successfully');
            done();
        });
    });
});

// describe('testing user/signup', () => {
//     it('should return status code 200 when user successfully register', (done) => {
//         const new_user = {
//             "email":"midetobi@gmail.com",
//             "password":"midetobi"
//         }
//         chai.request(app)
//         .post('/user/signup')
//         .send(new_user)
//         .end((err, res) => {
//             res.should.have.status(200);
//             expect(res.body.message).to.equal('Signup successful');
//             expect(res.body).to.have.property('session');
//             expect(res).to.be.json;
//             done();
//         })
//     });
// });