const multer = require("multer");
const express=require('express')
const app = express();
const router = express.Router();
var {Notification}=require('../models/notification')
var {User}=require('../models/User1')
var Message=require('../models/message')
var Conversation=require('../models/Conversation')
var Post=require('../models/post')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const salt = bcrypt.genSaltSync(10);
const server_secret_key='iamrajesh675gjhchshskijdiucacuijnuijniusjiudjcsdijcjsijcisjijsoisju'
app.use(bodyParser)



router.post("/post", async (req, res) => {
    const newPost = new Post(req.body);
    try {
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  
router.get("/conversations/:id", async (req, res) => {
  try {
    console.log(req.params.id,'good')
    const conversations = await Conversation.find({
      members: { $in: [req.params.id] },
    });
    res.status(200).json(conversations);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/currentchat/:id", async (req, res) => {
  try {
    const conversations = await Message.find({
      conversationId: req.params.id
    });
    console.log(conversations)
    res.status(200).json(conversations);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/currentchat", async (req, res) => {
  try {
    const conversations = new Message(req.body);
    const a=await conversations.save()
    console.log(a)
    res.status(200).json(a);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/conversations/first_nmae/second_name", async (req, res) => {
  try {
    const messages = await Message.findById(req.params.id);
   
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;