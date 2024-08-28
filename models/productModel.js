const conn = require('../config/database');

const Product = {
  // Lấy tất cả sản phẩm
  getAll: (callback) => {
    const query = 'SELECT * FROM products  ';
    conn.query(query, callback);
  },

  getPaginatedProducts: (limit, offset, callback) => {
    const query = 'SELECT * FROM products ORDER BY id DESC LIMIT ? OFFSET ?';
    conn.query(query, [limit, offset], callback);
  },
  countAll: (callback) => {
    const query = 'SELECT COUNT(*) AS total FROM products';
    conn.query(query, (err, results) => {
      if (err) return callback(err);
      callback(null, results[0].total);
    });
  },
  
  getById: (id, callback) => {
    const query = 'SELECT * FROM products WHERE id = ?';
    conn.query(query, [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    });
  },

  
  create: (product, callback) => {
    const query = 'INSERT INTO products SET ?';
    conn.query(query, product, callback);
  },

 
  update: (id, product, callback) => {
    const query = 'UPDATE products SET ? WHERE id = ?';
    conn.query(query, [product, id], callback);
  },

  
  delete: (id, callback) => {
    const query = 'DELETE FROM products WHERE id = ?';
    conn.query(query, [id], callback);
  },

  // Lấy sản phẩm mới nhất
  getLatestProducts: (limit, callback) => {
    const query = 'SELECT * FROM products ORDER BY created_at DESC LIMIT ?';
    conn.query(query, [limit], callback);
  },

  
  getSaleProducts: (limit, callback) => {
    const query = 'SELECT * FROM products WHERE sale_price > 0 ORDER BY created_at DESC LIMIT ?';
    conn.query(query, [limit], callback);
  },

  
  getHotProducts: (limit, callback) => {
    const query = 'SELECT * FROM products ORDER BY RAND() LIMIT ?';
    conn.query(query, [limit], callback);
  },

  // Lấy sản phẩm theo danh mục
  getProductsByCategory: (categoryId, callback) => {
    const query = 'SELECT * FROM products WHERE category_id = ?  ORDER BY created_at DESC ';
    conn.query(query, [categoryId], callback);
  },

  
  getRandomProducts: (limit, callback) => {
    const query = 'SELECT * FROM products ORDER BY RAND() LIMIT ?';
    conn.query(query, [limit], callback);
  }
};

module.exports = Product;
