const Product = require('../models/productModel');
const Category = require('../models/categoryModel');

const productController = {
  
  // Hiển thị danh sách sản phẩm với phân trang
  index: (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 4; 
    const offset = (page - 1) * limit; 

    // Lấy danh sách sản phẩm với phân trang
    Product.getPaginatedProducts(limit, offset, (err, products) => {
      if (err) {
        req.session.messages = { no: 'Lỗi khi tải danh sách sản phẩm' };
        return res.redirect('/');
      }

      // Lấy tổng số sản phẩm để tính toán tổng số trang
      Product.countAll((err, totalProducts) => {
        if (err) {
          req.session.messages = { no: 'Lỗi khi tải tổng số sản phẩm' };
          return res.redirect('/');
        }

        const totalPages = Math.ceil(totalProducts / limit); 

        res.render('products/index', {
          products,
          currentPage: page,
          totalPages,
          messages: req.session.messages || {}
        });

        req.session.messages = {}; 
      });
    });
  },

 
  create: (req, res) => {
    if (req.method === 'POST') {
      const newProduct = {
        name: req.body.name,
        image: req.file ? req.file.filename : null,
        sale_price: req.body.sale_price,
        price: req.body.price,
        category_id: req.body.category_id,
        content: req.body.content,
        status: req.body.status,
      };

      Product.create(newProduct, (err) => {
        if (err) {
          req.session.messages = { no: 'Thêm mới không thành công' };
          return res.redirect('/products/create');
        }
        req.session.messages = { ok: 'Thêm mới sản phẩm thành công' };
        res.redirect('/products');
      });
    } else {
      Category.getAllCategories((err, categories) => {
        if (err) {
          req.session.messages = { no: 'Lỗi khi tải danh mục' };
          return res.redirect('/products');
        }
        res.render('products/create', { categories, messages: req.session.messages || {} });
        req.session.messages = {}; // Xóa messages sau khi hiển thị
      });
    }
  },

  // Chỉnh sửa sản phẩm (không thay đổi)
  edit: (req, res) => {
    const id = req.params.id;
    if (req.method === 'POST') {
      const updatedProduct = {
        name: req.body.name,
        image: req.file ? req.file.filename : req.body.oldImage,
        sale_price: req.body.sale_price,
        price: req.body.price,
        category_id: req.body.category_id,
        content: req.body.content,
        status: req.body.status,
      };

      Product.update(id, updatedProduct, (err) => {
        if (err) {
          req.session.messages = { no: 'Sửa thất bại' };
          return res.redirect(`/products/edit/${id}`);
        }
        req.session.messages = { ok: 'Cập nhật thành công' };
        res.redirect('/products');
      });
    } else {
      Product.getById(id, (err, product) => {
        if (err) {
          req.session.messages = { no: 'Lỗi khi tải thông tin sản phẩm' };
          return res.redirect('/products');
        }
        Category.getAllCategories((err, categories) => {
          if (err) {
            req.session.messages = { no: 'Lỗi khi tải danh mục' };
            return res.redirect('/products');
          }
          res.render('products/edit', { product, categories, messages: req.session.messages || {} });
          req.session.messages = {}; // Xóa messages sau khi hiển thị
        });
      });
    }
  },

  
  delete: (req, res) => {
    const id = req.params.id;
    Product.delete(id, (err) => {
      if (err) {
        req.session.messages = { no: 'Xóa thất bại' };
        return res.redirect('/products');
      }
      req.session.messages = { ok: 'Xóa thành công' };
      res.redirect('/products');
    });
  }
};

module.exports = productController;
