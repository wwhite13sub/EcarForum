var db = require('./../db');

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