const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController');

// Trang chính
router.get('/', homeController.index);


router.get('/about', homeController.about);


router.get('/category/:catId', homeController.category);


router.get('/product/:productId', homeController.product);
router.get('/home/product/:productId', homeController.product);

router.get('/register', authController.getRegisterPage);
router.post('/register', authController.postRegister);


router.get('/login', authController.getLoginPage);
router.post('/login', authController.postLogin);

router.get('/logout', authController.getLogout);

module.exports = router;
