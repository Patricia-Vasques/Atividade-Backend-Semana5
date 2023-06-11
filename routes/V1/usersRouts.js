const express = require('express');
const usersRoutesV1 = express.Router();
const UsersController = require('../../controllers/users')

usersRoutesV1.patch('/list/:name', UsersController.retorneUsers);
usersRoutesV1.get('/list/:mes', UsersController.listarDatas)

module.exports = usersRoutesV1