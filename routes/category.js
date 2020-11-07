const db = require('./../db');
const moment = require('moment');

exports.categories = async function(req,res){
  db.query('SELECT * FROM Category_TBL', async function (error, results, fields) {
    if (error) {
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }else{
      res.send({
        "code":200,
        "success":"categories fetch successful",
        "categories": results
      });
    }
  });
}


exports.newQuestion = async function(req,res){
  const Category_num = req.body.Category_num;
  const Question_descr = req.body.Question_descr;
  const user_ID = req.body.user_ID;
  const Question_Date_Time = moment().format('YYYY-MM-DD HH:mm:ss');
  
  const question = {
    Category_num: Category_num,
    Question_descr: Question_descr,
    user_ID: user_ID,
    Question_Date_Time: Question_Date_Time
  }

  db.query('INSERT INTO Question_TBL SET ?',question, function (error, results, fields) {
    if (error) {
      res.send({
        "code":400,
        "failed":"error ocurred",
        "message": error
      })
    }else{
      res.send({
        "code":200,
        "success":"Question has been created successfully"
      });
    }
  });
}


exports.getQuestionList = async function(req,res){
  const page = req.body.page;
  const Category_num = req.body.Category_num;
  const user_ID = req.body.user_ID;

  const perPage = 5;
  const offset = (page - 1) * perPage;

  db.query('SELECT q.*, u.user_firstname FROM Question_TBL AS q LEFT JOIN User_TBL AS u ON q.user_ID = u.user_ID WHERE q.Category_num='+Category_num+' ORDER BY q.Question_Date_Time DESC  LIMIT '+perPage+' OFFSET '+offset, async function (error, results, fields) {
    if (error) {
      res.send({
        "code":400,
        "failed":"error ocurred",
        "message": error
      })
    }else{
      let questionList = {};
      let questionCount = 0;
      if (!results.length) {
        res.send({
          "code":200,
          "success":"categories fetch successful",
          "questionList": {
            data: [],
            noOfPages: 0
          }
        });
      }
      results.forEach((result, index) => {
        db.query('SELECT COUNT(*) AS count FROM Answer_TBL WHERE Question_num='+result.Question_num, async function (error, countResults, fields) {
          results[index]['Answer_num'] = countResults[0]['count'];
          questionCount++;
          if (questionCount === results.length) {
            questionList.data = results;
            db.query('SELECT COUNT(*) AS count FROM Question_TBL WHERE Category_num='+Category_num+' ORDER BY Question_Date_Time DESC', async function (error, results, fields) {
                questionList.noOfPages = Math.ceil(results[0]['count'] / perPage);
                res.send({
                  "code":200,
                  "success":"categories fetch successful",
                  "questionList": questionList
                });
            });
          }
        });
      });
    }
  });
}

exports.newAnswer = async function(req,res){
  const Question_num = req.body.Question_num;
  const Category_num = req.body.Category_num;
  const Answer_descr = req.body.Answer_descr;
  const user_ID = req.body.user_ID;
  const Answer_Date_Time = moment().format('YYYY-MM-DD HH:mm:ss');
  
  const answer = {
    Question_num: Question_num,
    Category_num: Category_num,
    Answer_descr: Answer_descr,
    user_ID: user_ID,
    Answer_Date_Time: Answer_Date_Time
  }

  db.query('INSERT INTO Answer_TBL SET ?',answer, function (error, results, fields) {
    if (error) {
      res.send({
        "code":400,
        "failed":"error ocurred",
        "message": error
      })
    }else{
      db.query('SELECT COUNT(*) AS count FROM Answer_TBL WHERE Question_num='+Question_num, async function (error, results, fields) {
        const numberOfAnswers = results[0]['count'];
        res.send({
          "code":200,
          "success":"Answer has been created successfully",
          "numberOfAnswers": numberOfAnswers
        });
      });
  
    }
  });
}

exports.getAnswerList = async function(req,res){
  const page = req.body.page;
  const Question_num = req.body.Question_num;
  const perPage = 5;
  const offset = (page - 1) * perPage;

  db.query('SELECT a.*, u.user_firstname FROM Answer_TBL AS a LEFT JOIN User_TBL AS u ON a.user_ID = u.user_ID WHERE a.Question_num='+Question_num+' ORDER BY a.Answer_Date_Time DESC LIMIT '+perPage+' OFFSET '+offset, async function (error, results, fields) {
    if (error) {
      res.send({
        "code":400,
        "failed":"error ocurred",
        "message": error
      })
    }else{
      let answerList = {};
      answerList.data = results;
      db.query('SELECT COUNT(*) AS count FROM Answer_TBL WHERE Question_num='+Question_num, async function (error, results, fields) {
        answerList.noOfPages = Math.ceil(results[0]['count'] / perPage);
        res.send({
          "code":200,
          "success":"categories fetch successful",
          "answerList": answerList
        });
      });
    }
  });
}
