const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multer = require('multer');

// Cấu hình multer để lưu trữ hình ảnh
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

router.get('/products', productController.index);
router.get('/products/create', productController.create);
router.post('/products/create', upload.single('image'), productController.create);
router.get('/products/edit/:id', productController.edit);
router.post('/products/edit/:id', upload.single('image'), productController.edit);
router.get('/products/delete/:id', productController.delete);

module.exports = router;
