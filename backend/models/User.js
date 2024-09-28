const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phonenumber: { type: String },
  bookmarks: [{ type: mongoose.Schema.Types.Mixed }] // To store article details
});

module.exports = mongoose.model('User', UserSchema);
