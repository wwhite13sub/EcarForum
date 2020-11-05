const db = require('./../db');
const bcrypt = require('bcryptjs');
const saltRounds = 10;   

exports.register = async function(req,res){
  const password = req.body.password;
  const encryptedPassword = await bcrypt.hash(password, saltRounds)
  const user = {
    "user_firstname":req.body.username,
    "user_password":encryptedPassword
  }

  db.query('SELECT * FROM User_TBL WHERE user_firstname = ?',[user.user_firstname], async function (error, results, fields) {
    if (error) {
      res.status(400).json({
        error: 'Registration failed!'
      });
    }else{
      if(results.length >0){
        //username exists
        res.status(400).json({
          error: 'Username already exists!'
        });
        return;
      }
        
      //register user
      db.query('INSERT INTO User_TBL SET ?',user, function (error, results, fields) {
        if (error) {
          res.status(400).json({
            error: 'Registration failed!'
          });
        } else {
          res.send({
            "code":200,
            "success":"user registered sucessfully"
              });
          }
      });
    }
  });
}
