const Customer = require('../models/customerModel');
const bcrypt = require('bcrypt');
const passport = require('passport');
const Category = require('../models/categoryModel');
const Banner = require('../models/bannerModel');
const getRegisterPage = (req, res) => {
    // Lấy danh mục từ model
    Banner.getFirstBanner((err, topBanner) => {
        if (err) {
            return res.send('Internal Server Error');
        }
    Category.getAllCategories((err, categories) => {
        if (err) {
            return res.send('Internal Server Error');
        }
        
        res.render('account/register', {
            userAuthenticated: req.isAuthenticated(),
            user: req.user,
            topBanner: topBanner,
            categories: categories // Truyền danh mục vào view
        });
    });
});
}

const postRegister = (req, res) => {
    const { name, email, phone, address, password } = req.body;

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.error('Error encrypting password:', err);
            return res.send('Error encrypting password');
        }

        const newCustomer = { name, email, phone, address, password: hashedPassword };
        
        Customer.findByEmail(email, (err, existingCustomer) => {
            if (err) {
                console.error('Error finding customer by email:', err);
                return res.send('Internal Server Error');
            }
            if (existingCustomer) {
                return res.status(400).send('Email already in use');
            }

            Customer.create(newCustomer, (err, customerId) => {
                if (err) {
                    console.error('Error creating customer:', err);
                    return res.send('Internal Server Error');
                }
                res.redirect('/login');
            });
        });
    });
};

const getLoginPage = (req, res) => {
    Banner.getFirstBanner((err, topBanner) => {
        if (err) {
            return res.send('Internal Server Error');
        }
    Category.getAllCategories((err, categories) => {
        if (err) {
            return res.send('Internal Server Error');
        }
        
        res.render('account/login', {
            userAuthenticated: req.isAuthenticated(),
            user: req.user,
            topBanner: topBanner,
            categories: categories // Truyền danh mục vào view
        });
    });
});
}

const postLogin = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true,
        successFlash: 'Login successful!' 
    })(req, res, next);
};

const getLogout = (req, res) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect('/');
    });
};

module.exports = {
    getRegisterPage,
    postRegister,
    getLoginPage,
    postLogin,
    getLogout
};
