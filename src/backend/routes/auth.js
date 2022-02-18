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

function checkloggedinuser(req,res,next) {

    const tokenheader = req.body.headers || req.headers['servertoken'];

    if (tokenheader) {
    
        jwt.verify(tokenheader, server_secret_key, function(err, decoded){
            if (!err) {
                req.body.uidfromtoken = decoded.uid;
                console.log('rajesh')
            }
            next();
        });
    }else {
      res.status(200).json({
        success: false
      });
    }

}
router.get("/getusers",checkloggedinuser,async function(req, res, next) {
  const a=await User.find()
  console.log(req.body.uidfromtoken)
  res.status(200).json({
    message: "internal server error",users:a
  });
})
router.post('/friendrequest',async function(req,res,next){
  console.log(req.body.from)
  const list=[]
  User.find({
    email:{$ne:req.body.from }
    }, function(err, users) {

  User.find({
    email:{$eq:req.body.from }
    }, function(err, userone) {
      users.map(user=>{
      //	console.log("connections",userone.connections.length)
        console.log("user--->",userone[0])     
        if(userone[0].connections.length) //all connection
        {
        for(var i=0;i<userone[0].connections.length;i++) //for all conn
        {
        
          if(user.email!=userone[0].connections[i].email) // if not in conection
          { 
            list.push(user);
          }
          console.log(user)
        }}
  
        else{	
          list.push(user)		
          console.log(user)
        }
    })})
    res.status(200).json({responseData:list});
  })
})

router.post('/addreq',async function (req,res,next){
  console.log(req.body.from)
    var data=await User.findOne({email:req.body.from})

      var existingWaitingList = data.waiting;
    var k=[]
      for(var i=0;i<existingWaitingList.length;i++){
        k.push(existingWaitingList[i].email)
        if(existingWaitingList[i].email===req.body.to.email)
     {
          existingWaitingList.splice(i,2); 
          var dataChange={$set:{waiting: existingWaitingList }}
          await User.updateOne({email:req.body.from},dataChange)
        }
     } 
    console.log(k)
    console.log(k.length)
    console.log((!(k.includes(req.body.to.email))))
    if(!(k.includes(req.body.to.email))){
      const email=req.body.to.email
      const first_name=req.body.to.first_name
      const last_name=req.body.to.last_name
      const job_title=req.body.to.job_title
      console.log(email,first_name,last_name,job_title)
      const waitin={email:email,first_name:first_name,last_name:last_name,job_title:job_title}
        console.log(data)
     data.waiting.push(waitin)
        console.log(data)
        await data.save()
       console.log(data)
      }
  res.status(200).json({
    message: "internal server error"
  })
})

router.get("/loaduser",checkloggedinuser,async function(req, res, next) {
  console.log(req.headers)
  console.log(req.body.uidfromtoken)
  const user=await User.find({email:{$eq:req.body.uidfromtoken }})
  res.status(200).json({
    message:user
  });
})

module.exports = router;