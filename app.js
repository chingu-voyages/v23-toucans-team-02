const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
require('dotenv').config();

const app = express();

const OpenWeatherMapAPIKey = process.env.APIKEY;


app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + "/"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});


app.post("/", function(req, res) {
  const units = "imperial";
  const lat = "43.07";
  const lon = "-70.76";

  // #TODO
  // Get API working
  // Pass data from API to index.html
  
  const url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=" + units +"exlude=hourly,daily&appid=" + OpenWeatherMapAPIKey
  // const url = "https://api.openweathermap.org/data/2.5/weather?q=Boston&units=&appid=" + OpenWeatherMapAPIKey
  // const url = "https://api.weather.gov/points/43.07,-70.76#"

  https.get(url, function(response) {

    response.on("data", function(data) {

      const weatherData = JSON.parse(data);

      console.log("weatherData: " + weatherData);
      console.log("LOG: " + weatherData.forecast);

    })
  })
});



// GOES AT BOTTOM OF FILE
app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000.");
});
