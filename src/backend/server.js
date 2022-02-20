const auth = require('./routes/auth');
const express=require('express')
const cors =require('cors')
const mongoose=require('mongoose')
const multer = require("multer");
const cron = require("node-cron");
const app=express()
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
app.use(cors())
const path = require("path");
app.use(express.json());
app.use("/auth", auth);
const url = "http://localhost:3000";
//const url = "hosting url";
app.use(cors({ origin: url, credentials: true }));
app.use(function(req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', url);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/images", express.static(path.join(__dirname, "public/images")));
mongoose.connect(
    'mongodb://127.0.0.1:27017',
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log('Connected to MongoDB')
    }
  )

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  
  const upload = multer({ storage: storage });
  app.post("/upload", upload.single("file"), (req, res) => {
    try {
      return res.status(200).json("File uploded successfully");
    } catch (error) {
      console.error(error);
    }
  });
  
const server = app.listen(3001,()=>{
    console.log("Linkedin server has started to listen at http://localhost:3001" );
});