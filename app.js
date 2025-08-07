const express = require('express');
const app = express();
const path = require("path");
const ejsMate = require('ejs-mate');

app.use(express.static(path.join(__dirname, 'public')));    
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', ejsMate);

app.listen(8000,(req, res) => {
   console.log(`Server is running on port ${8000}`);
});


app.get('/', (req, res) => {
   res.render("index");
});

app.get('/login', (req, res) => {
   res.render("login");
});

app.get('/register', (req, res) => {  
   res.render("register");
});