// module.exports = app => {
//     const questions = require("../controllers/question.controller");

//     const router = require("express").Router();

//     //Create a new Question
//     router.post("/questions", questions.create);

//     //Retrieve all questions
//     router.get("/questions", questions.findAll);

//     //Retrieve all published Questions
//     router.get("/posted", questions.findAllPosted);

//     //Retrieve a single Question with id
//     // router.get("/:id", questions.findOne);

//     //Update a Question with id (possibly will not utilize)
//     //router.put("/:id", questions.update);

//     //Delete a question with id (possibly will not use)
//     //router.delete("/:id", questions.delete);

//     //Create a new Question form (no)
//     //router.delete("/", questions.deleteAll);

//     app.use('/api/questions', router);
// };

