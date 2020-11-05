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
  console.log(req.body);
  const page = req.body.page;
  const Category_num = req.body.Category_num;
  const user_ID = req.body.user_ID;

  const perPage = 5;
  const offset = (page - 1) * perPage;

  db.query('SELECT * FROM Question_TBL WHERE Category_num='+Category_num+' AND user_ID='+user_ID+' ORDER BY Question_Date_Time DESC  LIMIT '+perPage+' OFFSET '+offset, async function (error, results, fields) {
    if (error) {
      res.send({
        "code":400,
        "failed":"error ocurred",
        "message": error
      })
    }else{
      let questionList = {};
      questionList.data = results;

      db.query('SELECT COUNT(*) AS count FROM Question_TBL WHERE Category_num='+Category_num+' AND user_ID='+user_ID+' ORDER BY Question_Date_Time DESC', async function (error, results, fields) {
          questionList.noOfPages = Math.ceil(results[0]['count'] / perPage);
          res.send({
            "code":200,
            "success":"categories fetch successful",
            "questionList": questionList
          });
      });
    }
  });
}