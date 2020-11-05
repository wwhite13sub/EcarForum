const express = require('express');
const bodyParser = require('body-parser');

//load .env
require('dotenv').config();

const app = express();
//parse requests of content-type -application/x-www--form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//parse requests of content-type -application/json
app.use(bodyParser.json());

//CORS middleware to allow access
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const router = express.Router();
//register routes
const register = require('./routes/register');
const authentication = require('./routes/authentication');
const category = require('./routes/category');

// test route
router.get('/', function(req, res) {
    res.json({ message: 'welcome to our upload module apis' });
});
//route to handle user registration
router.post('/register',register.register);
router.post('/login',authentication.login);
router.get('/get-categories',category.categories);
router.post('/new-question',category.newQuestion);
app.use('/api', router);

const port = process.env.PORT || 4000;
app.listen(port, function () {
    console.log(`Listening through port ${port}. `);
});
