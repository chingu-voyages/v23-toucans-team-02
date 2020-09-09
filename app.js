const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
// const http = require("http");

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

  // const url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=" + units +"&appid=" + OpenWeatherMapAPIKey
  const url = "https://api.openweathermap.org/data/2.5/weather?q=Boston&units=" + units +"&appid=" + OpenWeatherMapAPIKey
  // const url = "https://api.weather.gov/points/43.07,-70.76#"
console.log(url);
  https.get(url, function(response) {
    response.on("data", function(data) {
      const weatherData = JSON.parse(data);

      const currentTemp = weatherData.main.temp;
      console.log("temp: " + currentTemp);

    })
  })
  document.getElementById("temperature").innerHTML=currentTemp;
});


// https.get(url, function(response) {
//   console.log(response);
//
//   response.on("data", function(data) {
//     const weatherData = JSON.parse(data);
//     const temp = weatherData.main.temp;
//     const weatherDescription = weatherData.weather[0].description;
//
//     const iconUrl = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png"
//
//     res.write("<p>The weather is currently " + weatherDescription + ".<p>");
//     res.write("<p><h1>The temp in " + req.body.cityName + " is " + temp + " degrees F.</h1><p>");
//     res.write("<img src=" + iconUrl + ">");
//
//     res.send();


// GOES AT BOTTOM OF FILE
app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000.");
});
