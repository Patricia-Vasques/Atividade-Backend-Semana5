const express = require("express");
const usersRoutesV1 = express.Router();

//importar o controller
const  UserController = require("../../controllers/users")

//Rota do PATCH
usersRoutesV1.patch("/list:name",  UserController.retorneUsers);

module.exports = usersRoutesV1;