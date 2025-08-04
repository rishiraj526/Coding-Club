const express = require('express');
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, 'public')));    
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.listen(8000,(req, res) => {
   console.log(`Server is running on port ${8000}`);
});


app.get('/', (req, res) => {
 
   res.render("index");
});