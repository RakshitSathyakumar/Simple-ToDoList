const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();
const listItems=[];
const workItems = [];
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  var today = new Date();

  var day=today.toLocaleDateString("en-US",options);
//   var today = new Date();
  // var currDay=today.getDay();
  // var day="";var dayName="";
  // var days=['Sunday','Monday','Tuesday','Wednesday','Thrusday','Friday','Saturday'];
  // if(currDay == 6 || currDay == 0)
  // {
  //     day="weekend 😁  ";
  // }
  // else{
  //     day="weekday 😢 ";
  // }
  // // if(currDay == )
  // // currDay=(currDay+13)%7;
  // dayName=days[currDay];
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
