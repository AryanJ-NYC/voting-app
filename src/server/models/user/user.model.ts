'use strict';
import mongoose = require('mongoose');
import bcrypt = require('bcrypt-nodejs');

interface IUser extends mongoose.Document {
  email: string;
  password: string;
  updatedAt: string;
  createdAt: string;
}

let userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'An email address is required'],
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address'] },
  password: { type: String, required: [true, 'A password is required'] },
}, { timestamps: true });

userSchema.pre('save', function (next) {
  let user = this;
  bcrypt.hash(user.password, bcrypt.genSaltSync(8), null, function (err, hash) {
    if (err) return next(err);

    // override the cleartext password with the hashed one
    user.password = hash;
    next();
  });
});

// check if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model<IUser>('User', userSchema);
export = User;
