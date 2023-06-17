const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const date=require(__dirname+'/date.js');

const app = express();
const listItems=[];
const workItems = [];
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {

  var day=date.getDay();   
  res.render("list", {
    listTitle: day,
    listItems: listItems
  });

});

app.get("/work", function(req, res){
  res.render("list", {
    listTitle: "Work List",
    listItems: workItems});
});

app.post("/", function(req, res){

  if(req.body.listSubmit === "Work"){
    workItems.push(req.body.newTodo);
    res.redirect("/work");
  }else{
    listItems.push(req.body.newTodo);
    res.redirect("/");
  }
});


app.listen(3000, function (req, res) {
  console.log("Server is fine!");
});
