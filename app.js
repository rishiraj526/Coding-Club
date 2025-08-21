const express = require('express');
const app = express();
const path = require("path");
const ejsMate = require('ejs-mate');
const studentRoutes = require('./routes/studentRoutes');
const session = require('express-session');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const studentModel = require('./model/studentModel');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', ejsMate);


// MongoDB connection
MONGO_URL = 'mongodb://localhost:27017/coding-club'; // Update with your MongoDB URL
mongoose.connect(MONGO_URL).then(() => {
   console.log("MongoDB connected successfully");
}).catch(err => {
   console.error("MongoDB connection error:", err);
});

//session middleware

const sessionOption = {
   secret: "mySecretKey",
   resave: false,
   saveUninitialized: false,
   cookie: {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day
      maxAge: 1000 * 60 * 60 * 24 // 1 day
   }
} //configure session options

app.use(session(sessionOption));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(studentModel.authenticate()));
passport.serializeUser(studentModel.serializeUser()); 
passport.deserializeUser(studentModel.deserializeUser());

// Middleware to pass flash messages and user info to all views
app.use((req, res, next) => {
   res.locals.success = req.flash('success');
   res.locals.error = req.flash('error');
   res.locals.user = req.user; // Make user available in all views
   next();
});



app.listen(8000, (req, res) => {
   console.log(`Server is running on port ${8000}`);
});


app.get('/', (req, res) => {
   res.render("index");
});

app.use("/", studentRoutes);