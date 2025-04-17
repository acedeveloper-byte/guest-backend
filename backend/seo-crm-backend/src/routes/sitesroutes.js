const express = require('express');
const {
  addSite,
  getAllsites,
  updateSite,
} = require('../controller/sites/sitemain');

const siterouter = express.Router();

siterouter.get('/get-new-site', getAllsites);
siterouter.post('/create-new-site', addSite); // Fixed route path
siterouter.put('/update-site/:site_id', updateSite);
module.exports = siterouter; // Fixed export statement
