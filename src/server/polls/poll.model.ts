'use strict';
import mongoose = require('mongoose');

interface IOption {
  name: string;
  votes: string; // either IP address or ObjectId of user
}

interface IPoll extends mongoose.Document {
  title: string;
  options: Array<IOption>;
  createdAt: string;
  updatedAt: string;
}

let pollSchema = new mongoose.Schema({
  creatorId: { type: mongoose.Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  options: { type: [{
    name: { type: String, required: true },
    votes: [ String ] // either IP address or ObjectId of user
  }], required: true }
}, { timestamps: true });

const Poll = mongoose.model<IPoll>('Poll', pollSchema);
export = Poll;
