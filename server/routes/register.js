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
  
  db.query('INSERT INTO User_TBL SET ?',user, function (error, results, fields) {
    if (error) {
      res.send({
        "code":400,
        "failed":"error ocurred",
        "error": error
      })
    } else {
      res.send({
        "code":200,
        "success":"user registered sucessfully"
          });
      }
  });
}
