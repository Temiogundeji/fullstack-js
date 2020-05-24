
// it('it should not create a user without email address', (done) => {
//     let new_user = {
//         email: "John",
//         password: "Doe",
//     }
//       chai.request(app)
//       .post('/user/signup')
//       .send(new_user)
//       .end((err, res) => {
//             res.should.have.status(200);
//             res.body.should.be.a('object');
//         done();
//       });
// });
const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

describe('Signup tests', () => {
    it('should return status code 200 when valid data is received successfully!', done => {
        const new_user = {
            email: "midetobi@gmail.com",
            password: "midetobi"
        };

        chai.request(app)
        .post('/user/signup')
        .send(new_user)
            .end((err, res) => {
            res.should.have.status(200);
            expect(res.body.message).to.equal('Signup successful');
            expect(res.body).to.have.property('session');
            expect(res).to.be.json;
        });
        done();
    })
});