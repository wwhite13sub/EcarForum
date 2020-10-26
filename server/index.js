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



// //This is route handler home (all items)
// app.get('/', (req, res) => {
//     res.send('Hello express practice');
// });
// //This is route handler for list of courses
// app.get('/api/courses', (req, res) => {
//     res.send(courses);
// });


//#new
//function is ValidForm(form) {
//return form.name && form.name.toString().trim() !== ''
// }



// //route handler to post additional course, along with client validation
// app.post('/forms??', (req, res) => {
// if (is ValidForm??(req.body)) {
//insert into database--comment
//} else {
//res.status(422)
//res.json({
// message: 'Fields are required'
//})
// }
// });

//     const { error } = validateCourse(req.body);
//     if (error) {
//         res.status(400).send(result.error.details[0].message);
//         return;
//     }

//     const course = {
//         id: courses.length + 1,
//         name: req.body.name
//     };
//     courses.push(course);
//     res.send(course); //client to know ID of request
// });


// //Update "course" route handler
// app.put('/api/courses/:id', (req, res) => {
//     const course = courses.find(c => c.id === parseInt(req.params.id));
//     if (!course) return res.status(404).send('The course with given ID was not found')

//     const { error } = validateCourse(req.body); //equal to result.error
//     if (error) {
//         res.status(400).send(result.error.details[0].message);
//         return;
//     }

//     course.name = req.body.name;
//     //return updated course to client
//     res.send(course);
// });

// app.delete('/api/courses/:id', (req, res) => {
//     //Look up course, return 404 if exsisting course not found
//     const course = courses.find(c => c.id === parseInt(req.params.id));
//     if (!course) res.status(404).send('The course with given ID was not found')
//     //Delete
//     const index = courses.indexOf(course);
//     courses.splice(index, 1);
//     //return the same course to client 
//     res.send(course);
// });

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
