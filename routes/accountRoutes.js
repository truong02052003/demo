const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Đăng ký
router.get('/register', authController.getRegisterPage);
router.post('/register', authController.postRegister);

// Đăng nhập
router.get('/login', authController.getLoginPage);
router.post('/login', authController.postLogin);

// Đăng xuất
router.get('/logout', authController.getLogout);

router.get('/admin/login', authController.getLoginPage);
router.post('/admin/login', authController.postLogin);
router.get('/admin/logout', authController.getLogout);
module.exports = router;
