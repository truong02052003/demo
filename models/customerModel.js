const conn = require('../config/database'); 
const Customer = {
    // Hàm tìm kiếm khách hàng theo email (đã có)
    findByEmail: (email, callback) => {
        const sql = 'SELECT * FROM customers WHERE email = ?';
        conn.query(sql, [email], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0]);
        });
    },

    // Hàm tạo khách hàng (đã có)
    create: (newCustomer, callback) => {
        const sql = 'INSERT INTO customers SET ?';
        conn.query(sql, newCustomer, (err, results) => {
            if (err) return callback(err);
            callback(null, results.insertId);
        });
    },

    // Hàm tìm kiếm khách hàng theo id (mới thêm)
    findById: (id, callback) => {
        const sql = 'SELECT * FROM customers WHERE id = ?';
        conn.query(sql, [id], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0]);
        });
    }
};

module.exports = Customer;
