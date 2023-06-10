const { Router } = require("express");
const rotasV1 = Router();
const userRoutesV1 = require("./v1/userRouts");

rotasV1.use(userRoutesV1);

module.exports = rotasV1

