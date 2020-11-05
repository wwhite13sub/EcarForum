const db = require('./../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async function(req,res){
  const username= req.body.username;
  const password = req.body.password;
  db.query('SELECT * FROM User_TBL WHERE user_firstname = ?',[username], async function (error, results, fields) {
    if (error) {
      res.status(401).json({
        error: new Error('Invalid request!')
      });
    }else{
      if(results.length >0){
        const comparision = await bcrypt.compare(password, results[0].user_password)
        if(comparision){
          const token = jwt.sign(
            { userId: results[0].user_ID },
            'RANDOM_TOKEN_SECRET',
            { expiresIn: '24h' }
          );
          res.send({
            "code":200,
            "success":"login sucessfull",
            "user": {
              id: results[0].user_ID,
              username: results[0].user_firstname,
              token: token
            }
          });
        }
        else{
          res.send({
               "code":204,
               "success":"Username and password does not match"
          })
        }
      }
      else{
        res.status(401).json({
          error: new Error('Invalid request!')
        });
      }
    }
  });
}