var express = require('express');
var router = express.Router();
const users = require('../controllers/users');

router.post('/signup', users.signup);
router.post('/login', users.login);

module.exports = router;
