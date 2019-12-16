const chai = require('chai');
const chaiHttp = require('chai-http');
const crypto = require('crypto');

const server = require('../index');
const should = chai.should();
const errors = require('../errors.json');

chai.use(chaiHttp);

before((done) => {
    server.on('server_ready', async () => done());
});

const AKey = 'Test123';
const Token = '1ce6fe0b57990038ab4b';
const randomAKey = crypto.randomBytes(3).toString('hex');

describe('Settings', () => {
    describe('GET', () => {
        it('Requesting non-existing route should fail', (done) => {
            chai.request(server)
                .get('/')
                .end((err, response) => {
                    should.not.exist(err);
                    should.exist(response);
                    response.should.have.status(404);
                    response.body.should.have.property('error').eql(errors.UNKNOWN_ROUTE);
                    done();
                });
        });
        it('Requesting settings without authorization header should be rejected', (done) => {
            chai.request(server)
            .get(`/settings/${AKey}`)
            .end((err, response) => {
                should.not.exist(err);
                should.exist(response);
                response.should.have.status(400);
                response.body.should.have.property('error').eql(errors.MISSING_AUTHORIZATION);
                done();
            });
        });
        it('Requesting settings with non-existing authorization header should be rejected', (done) => {
            chai.request(server)
            .get(`/settings/${AKey}`)
            .set('Authorization', 'Bearer Test')
            .end((err, response) => {
                should.not.exist(err);
                should.exist(response);
                response.should.have.status(404);
                response.body.should.have.property('error').eql(errors.UNKNOWN_AUTHORIZATION);
                done();
            });
        });
        it('Requesting settings with existing authorization header but non-existing AKey should be rejected', (done) => {
            chai.request(server)
            .get(`/settings/${randomAKey}`)
            .set('Authorization', 'Bearer TestKey')
            .set('Authentication', crypto.randomBytes(10).toString('hex'))
            .end((err, response) => {
                should.not.exist(err);
                should.exist(response);
                response.should.have.status(404);
                response.body.should.have.property('error').eql(errors.AKEY_NOT_REGISTERED);
                done();
            });
        });
    });
});