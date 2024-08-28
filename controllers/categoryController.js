const Category = require('../models/categoryModel');

const getAllCategories = (req, res) => {
  Category.getAllCategories((err, categories) => {
    if (err) return res.send(err.message);

    // Truyền biến messages vào view và xóa sau khi đã hiển thị
    const messages = req.session.messages || {};
    req.session.messages = {};

    res.render('categories/index', { categories, messages });
  });
};
const getCategoryById = (req, res) => {
  Category.getCategoryById(req.params.id, (err, category) => {
    if (err) return res.send(err.message);

    // Truyền biến messages vào view và xóa sau khi đã hiển thị
    const messages = req.session.messages || {};
    req.session.messages = {};

    res.render('categories/edit', { category, messages });
  });
};
const createCategory = (req, res) => {
  Category.createCategory(req.body.name, req.body.status, (err) => {
    if (err) {
      req.session.messages = { no: 'Thêm không thành công' };
    } else {
      req.session.messages = { ok: 'Thêm thành công' };
    }
    res.redirect('/categories');
  });
};
const updateCategory = (req, res) => {
  Category.updateCategory(req.params.id, req.body.name, req.body.status, (err) => {
    if (err) {
      req.session.messages = { no: 'Sửa không thành công' };
    } else {
      req.session.messages = { ok: 'Sửa thành công' };
    }
    res.redirect('/categories');
  });
};
const deleteCategory = (req, res) => {
  const categoryId = req.params.id;

  Category.hasProducts(categoryId, (err, hasProducts) => {
    if (err) {
      req.session.messages = { no: 'Lỗi khi kiểm tra sản phẩm' };
      return res.redirect('/categories');
    }

    if (hasProducts) {
      req.session.messages = { no: 'Danh mục này có sản phẩm, không thể xóa' };
      return res.redirect('/categories');
    }

    Category.deleteCategory(categoryId, (err) => {
      if (err) {
        req.session.messages = { no: 'Xóa không thành công' };
      } else {
        req.session.messages = { ok: 'Xóa thành công' };
      }
      res.redirect('/categories');
    });
  });
};
module.exports={
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
}