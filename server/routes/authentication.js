const db = require('./../db');
const bcrypt = require('bcryptjs');

exports.login = async function(req,res){
  const username= req.body.username;
  const password = req.body.password;
  db.query('SELECT * FROM User_TBL WHERE user_firstname = ?',[username], async function (error, results, fields) {
    if (error) {
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }else{
      if(results.length >0){
        const comparision = await bcrypt.compare(password, results[0].user_password)
        if(comparision){
            res.send({
              "code":200,
              "success":"login sucessfull",
              "user": {
                id: results[0].user_ID,
                username: results[0].user_firstname
              }
            })
        }
        else{
          res.send({
               "code":204,
               "success":"Username and password does not match"
          })
        }
      }
      else{
        res.send({
          "code":206,
          "success":"Username does not exits"
            });
      }
    }
    });
}