const { render } = require('ejs');
const express = require('express');
const router = express.Router();
const path = require("path");
const studentModel = require('../model/studentModel'); // Importing the student model

// Importing the student controller

router.get('/register',(req,res)=>{
    res.render("register");
});

router.post('/register',(req,res)=>{
    const { name, email, password ,phone} = req.body;
    const newStudent = new studentModel({ name, email, password, phone});
    newStudent.save()
        .then(() => {
            console.log("New student registered successfully");
        })
        .catch(err => {
            console.error("Error registering student:", err);
            return res.status(500).send("Error registering student");
        }); 
    res.redirect('/login'); // Redirect to login after registration
});

router.get('/login',(req,res)=>{
    res.render("login");
});


module.exports = router;