'use strict';
import User = require('./user.model');

describe('user model', function () {
  describe('schemas', function () {
    let user = new User({
      'email': 'test@test.com',
      'password': 'test1234'
    });
    let unhashedPassword = user.password;

    it('hashes passwords before save', function () {
      user.save(function (err, user) {
        if (err) fail('save function throws error');
        expect(user.password).not.toEqual(unhashedPassword);
      });
    })
  })
});
