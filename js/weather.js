// const apiKey = 'ff989f0e492da5efe6a2b71ed5697395'

var weatherTemperature;
var weatherCity;
var weatherDescription;
var weatherImage;
var measurementChoice;
var units;
var storedUnits;
var userLat;
var userLog;

$('#check-input-log').change(function() {
  document.getElementById('textLongitude').value = $(this).val();
});

$('#check-input-lat').change(function() {
  document.getElementById('textLatitude').value = $(this).val();
});

function checkWeather() {
  console.log("checkWeather");
  var checkWeatherButton = document.getElementById('check-button')

  checkWeatherButton.onclick = function() {
    console.log("Check button clicked");
    userLat = document.getElementById("check-input-lat").value;
    userLog = document.getElementById("check-input-log").value;
    getTemperatureChoice();
    getWeather();
  }
}

function getTemperatureChoice() {

  console.log("getTemperatureChoice");
  let measurementChoice = localStorage.getItem('tempChooser');

  if (measurementChoice === "imperial") {
    document.getElementById('imperial').checked = true;
    document.getElementById('metric').checked = false;
    units = "imperial";
  } else if (measurementChoice === "metric") {
    document.getElementById('imperial').checked = false;
    document.getElementById('metric').checked = true;
    units = "metric";
  } else {
    document.getElementById('imperial').checked = false;
    document.getElementById('metric').checked = true;
    units = "metric";
  }
}

function storeTemperatureChoice() {
  console.log("storeTemperatureChoice");
  if (measurementChoice === true) {
    units = "imperial";
    localStorage.removeItem('tempChooser');
    localStorage.setItem('tempChooser', "imperial");
  } else {
    units = "metric";
    localStorage.removeItem('tempChooser');
    localStorage.setItem('tempChooser', "metric");
  };
}

function setTemperatureChoice() {
  console.log("setTemperatureChoice");
  // refer to index.html to get metric or imperial
  measurementChoice = document.getElementById("imperial").checked;
  storedUnits = localStorage.getItem('tempChooser');

  if (measurementChoice === true) {
    document.getElementById("imperial").checked = true;
    units = "imperial";
  } else {
    document.getElementById("metric").checked = true;
    units = "metric";
  };
  storeTemperatureChoice();
  checkWeather();
  userLat = document.getElementById("check-input-lat").value;
  userLog = document.getElementById("check-input-log").value;
  getWeather();
}

function getWeather() {
  console.log("getWeather");
  userLat = document.getElementById("check-input-lat").value;
  userLog = document.getElementById("check-input-log").value;
  console.log(userLat);
  let apiKey = process.env.OPENWEATHER_API_KEY;

  const query = `https://api.openweathermap.org/data/2.5/weather?lat=${userLat}&lon=${userLog}&units=${units}&APPID=${apiKey}`
  console.log("URL: " + query);
  getRequest(query)
}

function getRequest(query) {
  console.log("getRequest");
  fetch(query).then(response => {
    return response.json()
  }).then(data => {
    var weather = {}
    weather.img = data.weather[0].icon
    weather.city = data.name
    weather.temp = Math.round(data.main.temp)
    weather.desc = data.weather[0].description
    weather.lat = data.coord.lat
    weather.lon = data.coord.lon
    update(weather)
  }).catch(err => {
    console.log(err);
    alert('Oops! That\'s not a city! Try again.')
  })
}

function update(weather) {
  console.log("Update");
  printLocation(weather.lat, weather.lon)
  temperature.innerHTML = weather.temp + '&#176;'
  image.src = 'https://openweathermap.org/img/w/' + weather.img + '.png'
  description.innerHTML = weather.desc
}

window.onload = function() {
  console.log("window.onload");
  weatherTemperature = document.getElementById('temperature');
  weatherCity = document.getElementById('city');
  weatherImage = document.getElementById('image');
  weatherDescription = document.getElementById('description');
  // getLatLogvalues();
  // readUrlParams();
  getTemperatureChoice();
  checkWeather();
  getWeather();
}
