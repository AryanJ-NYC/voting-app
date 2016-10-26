'use strict';
import mongoose = require('mongoose');

interface IOption {
  name: string;
  votes: number;
}

interface IPoll extends mongoose.Document {
  title: string;
  options: Array<IOption>;
  createdAt: string;
  updatedAt: string;
}

let pollSchema = new mongoose.Schema({
  title: String,
  options: [{ name: String, votes: Number }]
}, { timestamps: true });

const Poll = mongoose.model<IPoll>('Poll', userSchema);
export = Poll;
