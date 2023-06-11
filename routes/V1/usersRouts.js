const express = require('express');
const usersRoutesV1 = express.Router();
const UsersController = require('../../controllers/users')

usersRoutesV1.patch('/list/:name', UsersController.retorneUsers);


module.exports = usersRoutesV1