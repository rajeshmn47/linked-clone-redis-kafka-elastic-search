const multer = require("multer");
const express=require('express')
const app = express();
const router = express.Router();
var {Notification}=require('../models/notification')
var {User}=require('../models/User1')
var Post=require('../models/post')
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
router.get("/getusers",async function(req, res,next){
  console.log(req.params.id)
  const b=await User.find()
  const k=await Post.find()
  console.log(k)
  console.log(req.body.uidfromtoken)
  res.status(200).json({
    message: "internal server error",users:b
  });
})
router.get("/getuserbymail/:email",async function(req, res,next){
  console.log(req.params.email)
  const user=await User.find({email:{$eq:req.params.email }})
  res.status(200).json({
    message: "internal server error",users:user
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
          existingWaitingList.splice(i,1); 
          var dataChange={$set:{waiting: existingWaitingList }}
          await User.updateOne({email:req.body.from},dataChange)
        }
     } 
     var dae=await User.findOne({email:req.body.to.email})
     var existingWaitingList = dae.pending;
   var k=[]
     for(var i=0;i<existingWaitingList.length;i++){
       k.push(existingWaitingList[i].email)
       if(existingWaitingList[i].email===req.body.from)
    {
         existingWaitingList.splice(i,1); 
         var dataChange={$set:{pending: existingWaitingList }}
         await User.updateOne({email:req.body.to.email},dataChange)
       }
    } 
    console.log(k)
    console.log(k.length)
    console.log((!(k.includes(req.body.to.email))))
    if(!(k.includes(req.body.from))){
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
        var da=await User.findOne({email:req.body.to.email})
        da.pending.push({email:req.body.from,first_name:first_name,last_name:last_name,job_title:job_title})
        await da.save()
       console.log(data)
      }
  res.status(200).json({
    message: "internal server error"
  })
})
router.post('/respondtorequest',async function(req,res,next){
  console.log(req.body)
  if(req.body.action==='accept'){
    console.log('trying')
  const user=await User.findOne({email:{$eq:req.body.useremail }})
  user.connections.push({email:req.body.email,first_name:req.body.first_name,last_name:'kjh',job_title:'doctor',
experience:55})
var pendingcon=user.pending
console.log(pendingcon,'rjkl')
var p=[]
for(var i=0;i<pendingcon.length;i++){
  console.log(pendingcon.length,'uio')
  console.log(pendingcon[0].email,'raji')
  console.log(i)
  if(pendingcon[i].email===req.body.email){
    pendingcon.splice(i,1)
    var dataChange={$set:{pending: pendingcon }}
    await User.updateOne({email:req.body.useremail},dataChange)
  }
}

  await user.save()
  console.log(user)
  console.log('responding')
  const user1=await User.findOne({email:{$eq:req.body.email }})
  user1.connections.push({email:user.email,first_name:user.first_name,last_name:user.last_name,
  job_title:'kas',experience:3})
  var pendingcon=user1.waiting
var p=[]
for(var i=0;i<pendingcon.length;i++){
  if(pendingcon[i].email===req.body.useremail){
    pendingcon.splice(i,1)
    var dataChange={$set:{waiting: pendingcon }}
    await User.updateOne({email:req.body.email},dataChange)
  }
}
  await user1.save()
  console.log(user1,'iamsexy')
  }
  res.status(200).json({
    message:'ok u re friends now'
  })
})
router.get("/loaduser",checkloggedinuser,async function(req, res, next) {
  console.log(req.headers)
  console.log(req.body.uidfromtoken)
  const notifications=await Notification.find()
  const user=await User.find({email:{$eq:req.body.uidfromtoken }})
  res.status(200).json({
    message:user
  });
})

  router.post("/post", async (req, res) => {
    const newPost = new Post(req.body);
    try {
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  router.get('/getposts',async(req,res)=>{
    const posts=await Post.find()
    res.status(200).json({
      data:posts
    });
  })
  router.get("/getuser/:id",async function(req, res, next) {
    console.log(req.params.id,'findingbyid')
    var fd = '5ebadc45a99bde77b2efb20e'
  try{
const b=await User.findById(req.params.id)
console.log('ok boy')
res.status(200).json({
  message: "internal server error",user:b
});
  }  catch(err){
    console.log('ok boy')
    res.status(200).json({
      message: "internal server error"
    });
  }
  })
  router.post("/editpost", async (req, res) => {
    console.log(req.body)
    var newpost = await Post.findById(req.body.id)
    newpost.desc=req.body.value
    try {
      const savedPost = await newpost.save();
      res.status(200).json(savedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.post('/likehandler',async(req,res)=>{
    var post=await Post.findById(req.body.postid)
    var toid=post.userId
  var touser=await User.findById(toid)

    var fr=await User.findById(req.body.userid)
    if(post.likes.includes(req.body.userid)){
      post.likes.remove(req.body.userid)
      await post.save()
    }
    else{
    post.likes.push(req.body.userid)
await post.save()
   var notification = new Notification( { 
        from:fr.first_name+" has liked ure post!",
        time: new Date().getTime(),
        status: "not_read",
        to: touser.email,
        type : "like"
      });
    }
res.status(200).json(post);
  })

  router.post('/addcomment',async(req,res)=>{
    var post=await Post.findById(req.body.postid)
    
      post.comments.push({text:req.body.commenttext,commenterId:req.body.userid})
      await post.save()
      console.log(req.body)
res.status(200).json(post);
  })
  router.get('/getnotifications',async(req,res)=>{
    const notifications=await Notification.find()
    res.status(200).json({
      data:notifications
    });
  })

module.exports = router;