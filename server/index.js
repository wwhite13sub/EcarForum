const express = require('express');
const app = express();
const mysql = require("mysql");
// const mysqlConnection = require("./routes/connection")
const bodyParser = require("body-parser");
const hbs = require('express-handlebars');
const port = process.env.PORT || 4000;
const cors = require('cors');
require('dotenv').config();


//Bootstrap 4.5.3 installed
//jquery + popper installed 3.5.1  1.16.1
app.use(bodyParser.json());
app.use(cors());
app.use(express.json()); //this calls middleware for post json body parser




const SELECT_ALL_QUESTIONS_QUERY = 'SELECT * FROM Question_TBL';

const connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    multipleStatements: true

});

connection.connect(err => {
    if (err) {
        return err;
    }
});

app.get('/', function (req, res) {
    res.send("This is server connected!");
});

app.get('/Question', (req, res) => {
    connection.query(SELECT_ALL_QUESTIONS_QUERY, (err, results) => {
        if (err) {
            return res.send(err)
        }
        else {
            return res.json({
                data: results
            })
        }
    });
});



app.listen(port, function () {
    console.log(`Listening through port ${port}. `)
});


// app.get('/api/courses/:id', (req, res) => {
//     const course = courses.find(c => c.id === parseInt(req.params.id)); //coverts string to integer
//     if (!course) res.status(404).send('the course with given ID not found')
//     res.send(course)//404
// });
// app.listen(port, () => console.log(`Listening on port ${port}.`));
