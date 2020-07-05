import { expect } from 'chai';
import request from 'supertest';
import app from './../server';

let token, token2;

describe('user validation', () => {
  it('it should signup user', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'fififi',
        email: 'fifi@yahoo.com',
        password: 'Opeyemi22',
        password_confirmation: 'Opeyemi22',
        user_role: 'admin'
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data).to.haveOwnProperty('newUser');
        expect(res.body.status).to.equal('success');
        done();
      });
  });

  it('it should not signup user with an existing email', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'fiuiioohj',
        email: 'fifi@yahoo.com',
        password: 'Opeyemi22',
        password_confirmation: 'Opeyemi22',
        user_role: 'admin'
      })
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
  it('it should signup user with an existing username', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'fififi',
        email: 'fifii@gmail.com',
        password: 'Opeyemi22',
        password_confirmation: 'Opeyemi22',
        user_role: 'admin'
      })
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });

  it('it should not signup user with an empty first name', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: '',
        email: 'fifi@yahoo.com',
        password: 'Opeyemi22',
        password_confirmation: 'Opeyemi22'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });

  it('it should not signup user with no email', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'HollaBee',
        password: 'Opeyemi22',
        role: 'user',
        password_confirmation: 'Opeyemi22'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });

  it('it should not signup user with invalid email', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'HollaBee',
        email: 'hsdhfjdsj',
        password: 'Opeyemi22',
        role: 'user',
        password_confirmation: 'Opeyemi22'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });

  it('it should not signup user with short username', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'hyu',
        email: 'fifi@yahoo.com',
        password: 'Opeyemuy2',
        role: 'user',
        password_confirmation: 'Opeyemi22'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
  it('it should not signup user with unmatched password', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'uioiiehdj',
        email: 'fifi23@yahoo.com',
        password: 'Opeyemuy2',
        role: 'user',
        password_confirmation: 'Opeyemi22'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });

  it('it should not signup user with short password', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'fifi234',
        email: 'fifix@yahoo.com',
        password: 'Ope2',
        password_confirmation: 'Opeyemi22'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
  it('it should not signup user with an unconfirmed password', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'fifi234',
        email: 'fifi@yahoo.com',
        password: 'Ope2'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });

  it('it should not signup user with an empty password', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'fifi234',
        email: 'fifi@yahoo.com',
        password: ''
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });

});