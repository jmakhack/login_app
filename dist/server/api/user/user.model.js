'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
  user: {type: String, required: true},
  password: {type: String, default: ''},
  count: {type: Number, default: 1}
});

module.exports = mongoose.model('User', UserSchema);