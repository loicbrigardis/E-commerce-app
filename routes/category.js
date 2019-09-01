const express = require('express');
const router = express.Router();

const { categoryById, create, read, update, remove, list } = require('../controllers/category.js');
const { requireSignin, isAdmin, isAuth } = require('../controllers/auth.js');
const { userById } = require('../controllers/user.js');

router.post('/category/create/:userId', requireSignin, isAdmin, isAuth, create);
router.get('/category/:categoryId', read);
router.put('/category/:categoryId/:userId', requireSignin, isAdmin, isAuth, update);
router.delete('/category/:categoryId/:userId', requireSignin, isAdmin, isAuth, remove);

router.get('/categories', list);

router.param('categoryId', categoryById);
router.param('userId', userById);

module.exports = router;