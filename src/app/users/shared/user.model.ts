import { Document, Schema, model } from 'mongoose';

export class User {
  username: string;
  password: string;
}

let userSchema = new Schema({
  username: { required: true, type: String },
  password: { required: true, type: String }
}, { timestamps: true });

export const Users = model('User', userSchema);
