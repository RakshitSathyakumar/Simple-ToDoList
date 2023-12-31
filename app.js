const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
require('dotenv').config()
const Item = require('./models/itemSchema');
// const List =require('./models/listSchema');


const app = express();

const PORT = process.env.PORT || 3000;

const uri = process.env.MONGO_URI;

mongoose.set('strictQuery',false);


mongoose
  .connect(uri)
  .then(() => {
    console.log("Connection was SuccessFull");
  })
  .catch((err) => {
    console.log(err);
  });

// const itemSchema = new mongoose.Schema({
//   name: String,
// });

let foundItems = [];
// const Item = new mongoose.model("Item", itemSchema);

// const listSchema = new mongoose.Schema({
//   name:String,
//   items:[itemSchema]
// });

// const List = new mongoose.model("List",listSchema);

// const createNewItem = async () => {
//   const itemOne = await Item.create({
//     name: "Welcome to ToDo liss",
//   });

//   const itemTwo = await Item.create({
//     name: "Hit add to Add new Item",
//   });

//   foundItems = [itemOne , itemTwo];
// };

// createNewItem();

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  const findQuery = async () => {
    let find = await Item.find().then(function (foundItems) {
      // console.log(find);

      var day = date.getDate();

      // foundItems.push(find);
      // console.log(foundItems.length);
      if (foundItems.length === 0) {
        // const itemOne="",itemTwo="";
        let createNewItem = async () => {
          let itemOne = await Item.create({
            name: "Welcome to ToDo list",
          });

          let itemTwo = await Item.create({
            name: "Hit add to Add new Item",
          });

          foundItems = [itemOne, itemTwo];
        };
        createNewItem();
        res.redirect("/");
      } else {
        // foundItems.push(find);
        res.render("list", {
          listTitle: day,
          listItems: foundItems,
        });
      }
    });
    // {
    //   console.log("Error occurred:", err);
    // }
  };
  findQuery();
});

app.post("/", function (req, res) {
  const itemName = req.body.newTodo;
  // console.log(itemName);
  let createNewItem = async () => {
    let itemOne = await Item.create({
      name: itemName,
    });
    foundItems.push(itemOne);
    console.log(itemOne);
  };
  createNewItem();

  res.redirect("/");
  // if (req.body.listSubmit === "Work") {
  //   workItems.push(req.body.newTodo);
  //   res.redirect("/work");
  // } else {
  //   listItems.push(req.body.newTodo);
  // }
});

app.post("/delete", function (req, res) {
  const deleteObj = req.body.checkbox;
  console.log(deleteObj);

  const delteNow = async () => {
    await Item.deleteOne({ _id: deleteObj });
  };
  delteNow();
  res.redirect("/");
  console.log("Object Deleted");
});

app.get("/:listName",(req,res)=>{
  console.log(req.params.listName);
});

app.listen(PORT, function (req, res) {
  console.log("Server is fine!");
});
