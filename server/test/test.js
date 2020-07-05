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

// Test for login
describe('user validation{login)', () => {
  it('it should not login with an incorrect email ', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'tuwalase'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });

  it('it should login ', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'hqey200@yahoo.com',
        password: 'lukas'
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data).to.haveOwnProperty('token');
        expect(res.body.status).to.equal('success');
        /* eslint-disable prefer-destructuring */
        token = res.body.data.token;
        done();
      });
  });
  it('it should login to give a different token ', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'tkenny@gmail.com',
        password: 'opemipo'
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data).to.haveOwnProperty('token');
        expect(res.body.status).to.equal('success');
        /* eslint-disable prefer-destructuring */
        token2 = res.body.data.token;
        done();
      });
  });

  it('should not login with an incorrect password ', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'tkenny@gmail.com',
        password: 'opemi1'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('error');
        done();
      });
  });

  it('should not login with an no email ', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({
        password: 'opppp'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });

  it('should not login with an no password ', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'tkenny@gmail.com'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
});

// it should create a request
describe('create a question', () => {
  it('it should  create a question', (done) => {
    request(app)
      .post('/api/v1/questions')
      .set('x-access-token', token)
      .send({
        question: 'Requests to fix the AC',
        date: '2019-04-09'
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data).to.haveOwnProperty('newQuestion');
        expect(res.body.status).to.equal('success');
        done();
      });
  });
  it('it should not  create question for an unauthorized user ', (done) => {
    request(app)
      .post('/api/v1/questions')
      .send({
        question: 'Requests to fix the AC',
        date: '2019-04-09'
      })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
  it('it should not create question without a question body', (done) => {
    request(app)
      .post('/api/v1/questions')
      .set('x-access-token', token)
      .send({
        date: '2019-04-09',
        userId: 4
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.data).to.haveOwnProperty('error');
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
  it('it should no create users with short question', (done) => {
    request(app)
      .post('/api/v1/questions')
      .set('x-access-token', token)
      .send({
        question: 'Requ',
        date: '2019-04-09',
        userId: 2
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.data).to.haveOwnProperty('error');
        expect(res.body.status).to.equal('fail');
        done();
      });
  });

});

// Test to modify a user's question
describe('UPDATE a question', () => {
  it('it should update a the question', (done) => {
    request(app)
      .put('/api/v1/questions/2')
      .set('x-access-token', token)
      .send({
        question: 'Requests to fix the AC'
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data).to.haveOwnProperty('question');
        expect(res.body.status).to.equal('success');
        done();
      });
  });
  it('it should not update a the question', (done) => {
    request(app)
      .put('/api/v1/questions/1')
      .set('x-access-token', token)
      .send({
        question: 'Requests to fix the AC',
      })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('question does not exist');
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
  it('it should not update a users question', (done) => {
    request(app)
      .put('/api/v1/questions/e')
      .set('x-access-token', token)
      .send({
        question: 'Requests to fix the AC',
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('input must be an integer');
        expect(res.body.status).to.equal('error');
        done();
      });
  });
  it('it should not update a question', (done) => {
    request(app)
      .put('/api/v1/questions/2.5')
      .set('x-access-token', token)
      .send({
        question: 'Requests to fix the AC',
      })
        .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('input must be an integer');
        expect(res.body.status).to.equal('error');
        done();
      });
  });
  it('it should not update a question', (done) => {
    request(app)
      .put('/api/v1/questions/6')
      .set('x-access-token', token)
      .send({
        question: 'Requests to fix the AC',
      })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('question does not exist');
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
});

// Test to get all questions
describe('GET all questions', () => {
  it('it should GET all questions', (done) => {
    request(app)
      .get('/api/v1/questions')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data).to.haveOwnProperty('questions');
        expect(res.body.status).to.equal('success');
        done();
      });
  });
  it('it should not get all questions', (done) => {
    request(app)
      .get('/api/v1/questions')
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
});

// Test to delte a user's question
describe('DELETE a question', () => {
  it('it should delete a the question', (done) => {
    request(app)
      .delete('/api/v1/questions/2')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('question deleted successfully');
        expect(res.body.status).to.equal('success');
        done();
      });
  });
  it('it should not delete the question', (done) => {
    request(app)
      .delete('/api/v1/questions/1')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('question does not exist');
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
  it('it should not delete the users question', (done) => {
    request(app)
      .delete('/api/v1/questions/e')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('input must be an integer');
        expect(res.body.status).to.equal('error');
        done();
      });
  });
  it('it should not delete a question', (done) => {
    request(app)
      .delete('/api/v1/questions/2.5')
      .set('x-access-token', token)
      .end((err, res) => {
      expect(res.status).to.equal(400);
      expect(res.body.message).to.equal('input must be an integer');
      expect(res.body.status).to.equal('error');
      done();
    });
  });
  it('it should not delete a question', (done) => {
    request(app)
      .delete('/api/v1/questions/6')
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
});

// it should create a comment
describe('create a comment', () => {
  it('it should  create a comment', (done) => {
    request(app)
      .post('/api/v1/comments')
      .set('x-access-token', token)
      .send({
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta corporis alias voluptas nesciunt quidem illo odit accusantium voluptatem, libero',
        questionId: 1
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data).to.haveOwnProperty('newQuestion');
        expect(res.body.status).to.equal('success');
        done();
      });
  });
  it('it should not  create comment for an unauthorized user ', (done) => {
    request(app)
      .post('/api/v1/comments')
      .send({
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta corporis alias voluptas nesciunt quidem illo odit accusantium voluptatem, libero',
        questionId: 1
      })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
  it('it should not create comments without a comment body', (done) => {
    request(app)
      .post('/api/v1/comments')
      .set('x-access-token', token)
      .send({
        questionId: 1
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.data).to.haveOwnProperty('error');
        expect(res.body.status).to.equal('fail');
        done();
      });
  });

  it('it should not create comment with an invalid questionId', (done) => {
    request(app)
      .post('/api/v1/comments')
      .set('x-access-token', token)
      .send({
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta corporis alias voluptas nesciunt quidem illo odit accusantium voluptatem, libero',
        questionId: 'e'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.haveOwnProperty('message');
        expect(res.body.status).to.equal('error');
        done();
      });
  });
  it('it should not create comment', (done) => {
    request(app)
      .post('/api/v1/comments')
      .set('x-access-token', token)
      .send({
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta corporis alias voluptas nesciunt quidem illo odit accusantium voluptatem, libero',
        questionId: 8
      })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.haveOwnProperty('message');
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
});

// it should get all comments
describe('get a comment', () => {
  it('it should  get a comment', (done) => {
    request(app)
      .get('/api/v1/comments/1')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data).to.haveOwnProperty('Comments');
        expect(res.body.status).to.equal('success');
        done();
      });
  });
  it('it should not get all comments for an unauthorized user ', (done) => {
    request(app)
      .get('/api/v1/comments/1')
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
  it('it should not get comments without an invalid question no', (done) => {
    request(app)
      .get('/api/v1/comments/e')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('input must be an integer');
        expect(res.body.status).to.equal('error');
        done();
      });
  });
  it('it should not get comment', (done) => {
    request(app)
      .get('/api/v1/comments/10')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.haveOwnProperty('message');
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
});

// it should get all comments
describe('get a comment', () => {
  it('it should  get a comment', (done) => {
    request(app)
      .get('/api/v1/comments/1')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data).to.haveOwnProperty('Comments');
        expect(res.body.status).to.equal('success');
        done();
      });
  });
  it('it should not get a comment for an unauthorized user ', (done) => {
    request(app)
      .get('/api/v1/comments/1')
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
  it('it should not get a comment without an invalid question no', (done) => {
    request(app)
      .get('/api/v1/comments/e')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('input must be an integer');
        expect(res.body.status).to.equal('error');
        done();
      });
  });
  it('it should not get a comment', (done) => {
    request(app)
      .get('/api/v1/comments/10')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.haveOwnProperty('message');
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
});

// it should modify a comment
describe('UPDATE a comment', () => {
  it('it should  update a comment', (done) => {
    request(app)
      .put('/api/v1/comments/2')
      .set('x-access-token', token)
      .send({
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta corporis alias voluptas nesciunt quidem illo odit accusantium ',
        likes: 'yes'
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data).to.haveOwnProperty('comment');
        expect(res.body.status).to.equal('success');
        done();
      });
  });
  it('it should not update comment for an unauthorized user ', (done) => {
    request(app)
      .put('/api/v1/comments/1')
      .send({
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta corporis alias voluptas nesciunt quidem illo odit accusantium ',
        likes: 'yes'
      })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
  it('it should not update comment without an invalid comment Id', (done) => {
    request(app)
      .put('/api/v1/comments/e')
      .set('x-access-token', token)
      .send({
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta corporis alias voluptas nesciunt quidem illo odit accusantium ',
        likes: 'yes'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('input must be an integer');
        expect(res.body.status).to.equal('error');
        done();
      });
  });
  it('it should not update comment', (done) => {
    request(app)
      .put('/api/v1/comments/10')
      .set('x-access-token', token)
      .send({
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta corporis alias voluptas nesciunt quidem illo odit accusantium ',
        likes: 'yes'
      })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.haveOwnProperty('message');
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
});

// it should delete a comment
describe('DELETE a comment', () => {
  it('it should  delete a comment', (done) => {
    request(app)
      .delete('/api/v1/comments/2')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal('success');
        done();
      });
  });
  it('it should not delete comment for an unauthorized user ', (done) => {
    request(app)
      .delete('/api/v1/comments/1')
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
  it('it should not delete comment without an invalid comment Id', (done) => {
    request(app)
      .delete('/api/v1/comments/e')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('input must be an integer');
        expect(res.body.status).to.equal('error');
        done();
      });
  });
  it('it should not delete comment', (done) => {
    request(app)
      .delete('/api/v1/comments/10')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.haveOwnProperty('message');
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
});

// Test for an Admin to get all users
describe('GET all users', () => {
  it('it should get all users', (done) => {
    request(app)
      .get('/api/v1/users/getAllUsers')
      .set('x-access-token', token2)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data).to.haveOwnProperty('allUsers');
        expect(res.body.status).to.equal('success');
        done();
      });
  });
  it('it should not get all users for non admin', (done) => {
    request(app)
      .get('/api/v1/users/getAllUsers')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('Forbidden to non admin');
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
  it('it should not get allusers without a token', (done) => {
    request(app)
      .get('/api/v1/users/getAllUsers')
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.message).to.equal('Token not provided or Invalid Token');
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
});


// Test for an admin to delete a user
describe('GET all users', () => {
  it('it should delete a user', (done) => {
    request(app)
      .delete('/api/v1/users/deleteAUser/4')
      .set('x-access-token', token2)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('user deleted successfully');
        expect(res.body.status).to.equal('success');
        done();
      });
  });
  it('it should not grant access for non admin', (done) => {
    request(app)
      .delete('/api/v1/users/deleteAUser/4')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('Forbidden to non admin');
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
  it('it should not grant access without a token', (done) => {
    request(app)
      .delete('/api/v1/users/deleteAUser/4')
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.message).to.equal('Token not provided or Invalid Token');
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
  it('it should not take invalid userId', (done) => {
    request(app)
      .delete('/api/v1/users/deleteAUser/s')
      .set('x-access-token', token2)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('input must be an integer');
        expect(res.body.status).to.equal('error');
        done();
      });
  });
});