const express = require("express");
const app = express();
const path = require("path");
const multer = require("multer");

const { error } = require("console");



app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

var storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "upload");
  },
  filename: (req, file, callback) => {
    callback(null,file.originalname.replace(/\.[^/.]+$/,"") + "_" + Date.now() + path.extname(file.originalname))
  }
});

let maxsize = 5 * 1000 * 1000;

let upload = multer({
  storage: storage,
  limits: {
    fileSize: maxsize,
  },
  fileFilter: (req, file, callback) => {
    let filetype = /jpeg|png|jpg/;
    let mimetype = filetype.test(file.mimetype);
    let extname = filetype.test(path.extname(file.originalname).toLowerCase);

    if(mimetype && extname){
       
      return callback(null,true);

    }

    callback("Error this file not support :" + filetype)
  }
}).single('mypic');

app.get('/',(req,res,next)=>{

  res.render('sinup')

})

app.post('/upload',(req,res,next)=>{

  upload(req,res,(err)=>{

    if (err) {
      res.send(err)
    }
    else{
      res.send('success.. Image uploade')
    }

  })

})

app.listen(3030,()=>{

  console.log('server is runing');
})
