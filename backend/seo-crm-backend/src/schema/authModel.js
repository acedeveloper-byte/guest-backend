const mongoose = require('mongoose');
const moment = require('moment-timezone');

const AuthSchema = new mongoose.Schema(
  {
    user_name: { type: String, required: true },
    email: { type: String, required: true },
    number: { type: Number, required: true },
    password: { type: String, required: true },
    site: [
      {
        site_id: { type: String, required: true },
        site_name: { type: String, required: true },
      },
    ],
  },
  { timestamps: true } // Enables createdAt and updatedAt fields
);

// Convert timestamps to IST before returning JSON
AuthSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.createdAt = moment(ret.createdAt)
      .tz('Asia/Kolkata')
      .format('YYYY-MM-DD HH:mm:ss');
    ret.updatedAt = moment(ret.updatedAt)
      .tz('Asia/Kolkata')
      .format('YYYY-MM-DD HH:mm:ss');
    return ret;
  },
});

const Auth = mongoose.model('Auth', AuthSchema);
module.exports = Auth;
