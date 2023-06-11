const express = require('express');
const usersRoutesV1 = express.Router();
const UsersController = require('../../controllers/users')

usersRoutesV1.patch('/list/:name', UsersController.retorneUsers);
usersRoutesV1.get('/list/:mes', UsersController.listarDatas);
usersRoutesV1.get('/users/', UsersController.filtrarDados);
usersRoutesV1.get('/dados/:id', UsersController.nomeUsuario);
usersRoutesV1.post('/list', UsersController.salvarData);
usersRoutesV1.post('/converter', UsersController.converterString);
usersRoutesV1.put('/dados/:id', UsersController.alterarDados);
usersRoutesV1.delete('/dados/:id', UsersController.removerItem);



module.exports = usersRoutesV1