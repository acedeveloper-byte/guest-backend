const mongoose = require('mongoose');

const SiteSchema = new mongoose.Schema(
  {
    site_id: { type: String, require: true },
    site_name: { type: String, require: true },
    site_tfn: { type: Number, require: true },
    site_status: { type: Boolean, require: true },
  },
  { timeStamp: true }
);

module.exports = mongoose.model('sites', SiteSchema);
