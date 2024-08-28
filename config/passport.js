const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const Customer = require('../models/customerModel');

module.exports = (passport) => {
    passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        Customer.findByEmail(email, (err, customer) => {
            if (err) return done(err);
            if (!customer) return done(null, false, { message: 'No user with that email' });

            bcrypt.compare(password, customer.password, (err, isMatch) => {
                if (err) return done(err);
                if (isMatch) {
                    return done(null, customer);
                } else {
                    return done(null, false, { message: 'Password incorrect' });
                }
            });
        });
    }));

    passport.serializeUser((customer, done) => {
        done(null, customer.id);
    });

    passport.deserializeUser((id, done) => {
        Customer.findById(id, (err, customer) => {
            done(err, customer);
        });
    });
};
