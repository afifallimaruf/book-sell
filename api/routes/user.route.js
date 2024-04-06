const { logout } = require("../controllers/user.controller");
const router = require("express").Router();

router.post("/logout", logout);

module.exports = logout;
