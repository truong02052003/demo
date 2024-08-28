const conn = require('../config/database');

const Category = {
  // Lấy tất cả danh mục
  getAllCategories: (callback) => {
    const query = 'SELECT * FROM categories ORDER BY id ASC';
    conn.query(query, callback);
  },

  
  getCategoryById: (id, callback) => {
    const query = 'SELECT * FROM categories WHERE id = ?';
    conn.query(query, [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    });
  },

  
  createCategory: (name, status, callback) => {
    const query = 'INSERT INTO categories (name, status) VALUES (?, ?)';
    conn.query(query, [name, status], callback);
  },

  
  updateCategory: (id, name, status, callback) => {
    const query = 'UPDATE categories SET name = ?, status = ? WHERE id = ?';
    conn.query(query, [name, status, id], callback);
  },

  // Kiểm tra xem danh mục có sản phẩm không
  hasProducts: (categoryId, callback) => {
    const query = 'SELECT COUNT(*) AS count FROM products WHERE category_id = ?';
    conn.query(query, [categoryId], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0].count > 0);
    });
  },

  deleteCategory: (id, callback) => {
    const query = 'DELETE FROM categories WHERE id = ?';
    conn.query(query, [id], callback);
  }
};

module.exports = Category;
