const express = require('express');
const router = express.Router();

const { signup, signin, signout } = require('../controllers/auth.js');
const { userValidator } = require('../validators/user');

router.post('/signup', userValidator, signup);
router.post('/signin', signin);
router.get('/signout', signout);

module.exports = router;