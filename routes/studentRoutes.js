const { render } = require('ejs');
const express = require('express');
const router = express.Router();
const path = require("path");
const studentModel = require('../model/studentModel'); // Importing the student model
const { authenticate } = require('passport');
const passport = require('passport');
const isLoggedIn = require('../middleware'); // Importing middleware for authentication



// Importing the student controller

router.get('/register', (req, res) => {
    res.render("register");
});

router.post('/register', (req, res) => {
    const { name, email, password, phone, branch, semester, username } = req.body;
    try {
        const newStudent = new studentModel({ name, email, password, phone, branch, semester, username });
        studentModel.register(newStudent, password, (err, student) => {
            if (err) {
                console.error("Error registering student:", err);
                req.flash('error', err.message);
                return res.redirect('/register');
            }
            req.flash('success', 'Registration successful! You can now log in.');
            res.redirect('/login');
        });
    } catch (error) {
        console.error("Error in registration process:", error);
        
        req.flash('error', error.message);
        res.redirect('/register');
    }

});

router.get('/login', (req, res) => {
    res.render("login");
});

router.post('/login', passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true
}), (req, res) => {
    req.flash('success', 'Login successful! Welcome back.');
    res.redirect('/dashboard');
});

router.get('/logout', (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success', 'You have logged out successfully.');
        res.redirect('/login');
    });
});


router.get('/dashboard', isLoggedIn, (req, res) => {
    res.render("dashboard", { user: req.user });
});

module.exports = router;