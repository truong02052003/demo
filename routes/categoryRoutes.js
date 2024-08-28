const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/categories', categoryController.getAllCategories);
router.get('/categories/create', (req, res) => res.render('categories/create'));
router.post('/categories/create', categoryController.createCategory);
router.get('/categories/edit/:id', categoryController.getCategoryById);
router.post('/categories/update/:id', categoryController.updateCategory);
router.get('/categories/delete/:id', categoryController.deleteCategory);

module.exports = router;
