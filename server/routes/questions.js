const mysql = require("mysql");

const SELECT_ALL_QUESTIONS_QUERY = 'SELECT * FROM Question_TBL';
const SELECT_ALL_ANSWER_QUERY = 'SELECT * FROM Answer_TBL';

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


module.exports = app => {
app.get('/', function (req, res) {
    res.send("Welcome to Electric Car Forum.");
});

app.get('/question', (req, res) => {
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

app.post('/question', (req, res) => {
    res.send("POST")
})

app.get('/answer', (req, res) => {
    connection.query(SELECT_ALL_ANSWER_QUERY, (err, results) => {
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




}