const express = require('express');
const {
  adduser,
  login,
  edituser,
  deleteuser,
  fetchuser,
} = require('../controller/authentication/authMain');

const authrouter = express.Router();

authrouter.post('/add-new-user', adduser);
authrouter.put('/edit-user/:user_id', edituser);
authrouter.patch('/delete-user/:user_id', deleteuser);
authrouter.get('/fetch-user', fetchuser);
authrouter.post('/login-user', login);

module.exports = authrouter;
