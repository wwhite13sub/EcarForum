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