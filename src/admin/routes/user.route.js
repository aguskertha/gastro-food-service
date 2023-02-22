var express = require('express');
var router = express.Router();
const { loginPage, registerPage, register, login, logout, resetPassword, getFormResetPassword } = require('./../controllers/user.controller');

router.get('/login', loginPage);
router.get('/register', registerPage);
router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/reset-password', getFormResetPassword);
router.post('/reset-password', resetPassword);

module.exports = router;