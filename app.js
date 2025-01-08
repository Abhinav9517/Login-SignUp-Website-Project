const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyparser = require("body-parser")
//Mongoose connect to node
const app = express();
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/loginData');}
const port = 8000;

//Define mongoose Schema
const loginDataSchema = new mongoose.Schema({
  name: String,
  email: String,
  pwd: String,
});

const Data = mongoose.model('Data', loginDataSchema);


// EXPRESS SPECIFIC STUFFS
app.use('/static', express.static('static')); //For serving static files
app.use(express.urlencoded())


//PUG SPECIFIC STUFFS
app.set('view engine', 'pug') //Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) //Set the views directory



//ENDPOINTS
app.get("/", (req, res)=>{
  const params = { }
  res.status(200).render('home.pug', params)
})


app.post("/", (req, res)=>{
  var myData = new Data(req.body);
  myData.save().then(()=>{
      res.send("This item has been saved to the database")
  }).catch(()=>{
      res.status(400).send("Item was not saved to the database.")
  });
  // res.status(200).render('contact.pug')
})



//START THE SERVER
app.listen(port, ()=>{
  console.log(`The application started successfully on port ${port}`)
});