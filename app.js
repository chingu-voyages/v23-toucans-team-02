require('dotenv').config();
const express = require("express");



const app = express();

// var apiKey = process.env.OPENWEATHER_API_KEY;

app.use(express.static(__dirname + "/"));
app.use(express.static("/css/styles.css"));

app.get("/", function(req, res) {
  res.render("index");
})



// KEEP AT THE BOTTOM OF THIS FILE
app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000.");
});
