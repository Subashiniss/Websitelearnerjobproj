const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");

const app = express();

app.use(express.static("public"));
app.set('view engine','ejs');
// app.set('views', path.join( __dirname, 'views'));
// app.use(express.static(path.join( __dirname, 'public')));
app.use(bodyParser.urlencoded({
  extended:true
}));

// mongoose.connect("mongodb://ac-7zq3frb-shard-00-00.arxygkw.mongodb.net:27017,ac-7zq3frb-shard-00-01.arxygkw.mongodb.net:27017,ac-7zq3frb-shard-00-02.arxygkw.mongodb.net:27017/usersDB,subazhini:pkyqJAe6EbRm84IT", {useNewUrlParser: true},{ useUnifiedTopology: true });
mongoose.connect("mongodb://localhost:27017/usersDB",{useNewUrlParser:true});

const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

const secret="Thisismycutebabiesdhruvandsidloveyouforever."
userSchema.plugin(encrypt,{ secret: secret,encryptedFields: ["password"]});

const User = new mongoose.model("User",userSchema);

app.get("/",function(req,res){
  res.render("home");
});

app.get("/login",function(req,res){
  res.render("login");
});

app.get("/register",function(req,res){
  res.render("register");
});

app.post("/register",function(req,res){
  const newUser = new User({
    email :req.body.username,
    password: req.body.password
  });

  newUser.save()
  res.render("secrets1");
});

app.post("/login",function(req,res){
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({email : username},function(err,foundUser){

    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        if(foundUser.password === password) {
            res.render("secrets1");
          }

      }

    }




  });





});





app.listen(3000,function(){
  console.log("server is running in port 3000");
});
