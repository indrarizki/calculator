const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  loginTime: {
    type: Date,
    default: Date.now,
  },
  logoutTime: {
    type: Date,
    default: null,
  },
});

const LoginTime = mongoose.model('LoginTime', userSchema);

module.exports = LoginTime;