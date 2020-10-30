const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const fundamentalsController = require('./controllers/fundamental');
const homeController = require('./controllers/home');
const errorController = require('./controllers/404');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname, 'public', 'css')));
app.use(express.static(path.join(__dirname, 'public', 'js')));
app.use(express.static(path.join(__dirname, 'public', 'img')));

app.get( ['/', '/home'] , homeController.home);

app.get('/fundamentals/:company', fundamentalsController.loadFundamentals);

app.use(errorController.error);

app.listen(3000);