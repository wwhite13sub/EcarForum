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
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

const router = express.Router();

//authorization middleware
const auth = require('./middleware/auth');

//register routes
const register = require('./routes/register');
const authentication = require('./routes/authentication');
const category = require('./routes/category');

// test route
router.get('/', function(req, res) {
    res.json({ message: 'welcome ' });
});
//route to handle user registration
router.post('/register',register.register);
router.post('/login',authentication.login);

//authorized routes
router.get('/get-categories', auth, category.categories);
router.post('/new-question', auth, category.newQuestion);
router.post('/get-question-list', auth, category.getQuestionList);
router.post('/new-answer', auth, category.newAnswer);
router.post('/get-answer-list', auth, category.getAnswerList);
app.use('/api', router);

if (process.env.NODE_ENV === "production") {
    const buildDir = `${__dirname}/client/build`
    app.use("/", express.static(buildDir))
    app.get("*", (req, res) => {
        res.sendFile(`${buildDir}/index.html`)
    })
}

const port = process.env.PORT || 4000;
app.listen(port, function () {
    console.log(`Listening through port ${port}. `);
});
