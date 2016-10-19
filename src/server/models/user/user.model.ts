'use strict';
import mongoose = require('mongoose');
import bcrypt = require('bcrypt-nodejs');

interface User extends mongoose.Document {
  email: string;
  password: string;
  updatedAt: string;
  createdAt: string;
};

let userSchema = new mongoose.Schema({
  email        : { type: String, required: true },
  password     : { type: String, required: true },
}, { timestamps: true });

userSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
}.bind(this));

export const User = mongoose.model<User>('User', userSchema);
