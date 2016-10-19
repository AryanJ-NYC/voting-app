'use strict';
import { User } from './user.model';

describe('user object', function () {
  it('has an email key', function () {
    let user = new User();
    expect(user.email).toEqual(jasmine.anything);
  });
  
  it('has a password key', function () {
    let user = new User();
    expect(user.password).toEqual(jasmine.anything);
  });
  
  it('has a password key', function () {
    let user = new User();
    expect(user.password).toEqual(jasmine.anything);
  });
  
  it('has a updatedAt key', function () {
    let user = new User();
    expect(user.updatedAt).toEqual(jasmine.anything);
  });
  
  it('has a createdAt key', function () {
    let user = new User();
    expect(user.createdAt).toEqual(jasmine.anything);
  });
});
