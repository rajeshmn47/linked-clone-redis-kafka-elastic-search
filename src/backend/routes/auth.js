const multer = require("multer");
const express=require('express')
const app = express();
const router = express.Router();
var {User}=require('../models/User1')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const salt = bcrypt.genSaltSync(10);
const server_secret_key='iamrajesh675gjhchshskijdiucacuijnuijniusjiudjcsdijcjsijcisjijsoisju'
app.use(bodyParser)
router.post("/signup", async function(req, res, next) {
    var passwordToSave = bcrypt.hashSync(req.body.password, salt);
    console.log(req.body)
    const userdetails= new User({
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email,
        password:passwordToSave,
    })
    await userdetails.save()
 
})
router.post("/login", async function(req, res, next) {
    console.log(req.body)
    const userdetails={ email:req.body.email,
        password:req.body.password,}
        User.find({"email":req.body.email,})
    .exec()
    .then(doc => {
      // console.log("response got : ", doc);
      if (doc != undefined && doc.length > 0) {
          console.log(userdetails.password)
          console.log(doc)
          console.log(req.body.password)
        if (bcrypt.compareSync(req.body.password, doc[0].password)) {
          const server_token = jwt.sign(
            { uid: doc[0].email },
            server_secret_key
          );
          // console.log("UID from JWT: ", doc[0].email);
          res.status(200).json({
            message: "User Logged in Successfully",
            server_token: server_token,
            current_user: doc[0].email,
            user_Details: doc[0]
          });
        } else {
          console.log("Error.!!!!!!!");
          res.status(401).json({
            message: "Applicant entered wrong password"
          });
        }
      } else {
        console.log("Applicant is not registered, First Signup");
        res.status(400).json({
          message: "Applicant is not registered, First Signup"
        });
      }
    })
    .catch(err => {
      console.log("Error : ", err);
      res.status(500).json({
        message: "internal server error"
      });
    });
})
module.exports = router;