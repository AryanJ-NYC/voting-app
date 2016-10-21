'use strict';
import User = require('./user.model');

describe('user model', function () {
  describe('schemas', function () {
    describe('email', function () {
      it('hashes passwords before save', function () {
        let user = new User({
          'email': 'test@test.com',
          'password': 'test1234'
        });
        let unhashedPassword = user.password;
        user.save(function (err) {
          if (err) fail('save function throws error');
          expect(user.password).not.toEqual(unhashedPassword);
        });
      });

      it('does not allow blank passwords', function () {
        let user = new User({
          'email': 'test@test.com',
          'password': ''
        });

        user.save(function(err) {
          if (err) expect(err.message).toBe('Please fill a valid email address');
          else fail('blank password accepted');
        });
      });

      it('verifies email addresses', function () {
        let user = new User({
          'email': 'email@a',
          'password': 'test1234'
        });

        user.save(function (err) {
          if (err) expect(err.message).toBe('Please fill a valid email address');
          else fail('invalid email address accepted');
        })
      });
    });
  });
});
