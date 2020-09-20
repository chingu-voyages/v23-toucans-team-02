const apiKey = 'ff989f0e492da5efe6a2b71ed5697395'

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

  var checkWeatherButton = document.getElementById('check-button')

  checkWeatherButton.onclick = function() {
    userLat = document.getElementById("check-input-lat").value;
    userLog = document.getElementById("check-input-log").value;
    getTemperatureChoice();
    getWeather();
  }
}

// due to geolocation function, we do not need to save Lat Long in localStorage
// function getLatLogvalues() {
//   let userLat = localStorage.getItem('weatherLat');
//   let userLog = localStorage.getItem('weatherLog');
//   console.log("userLat: " + userLat);
//   console.log("userLog: " + userLog);
//
//   if (userLat !== null) {
//     document.getElementById("check-input-lat").value = userLat;
//     document.getElementById("textLatitude").value = userLat;
//   } else {
//     console.log("No Lat in Local Storage");
//     document.getElementById("check-input-lat").value = "51.482";
//     document.getElementById("textLatitude").value = "51.482";
//   }
//
//   if (userLog !== null) {
//     document.getElementById("check-input-log").value = userLog;
//     document.getElementById("textLongitude").value = userLog;
//   } else {
//     console.log("No Log in Local Storage");
//     document.getElementById("check-input-log").value = "-0.007";
//     document.getElementById("textLongitude").value = "-0.007";
//   }
//
//   userLat = document.getElementById("check-input-lat").value;
//   userLog = document.getElementById("check-input-log").value;
//
//   document.getElementById("textLatitude").value = userLat;
//   document.getElementById("textLongitude").value = userLog;
// }

function getTemperatureChoice() {

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
}

function getWeather() {
  const query = `https://api.openweathermap.org/data/2.5/weather?lat=${userLat}&lon=${userLog}&units=${units}&APPID=${apiKey}`
  getRequest(query)
}

function getRequest(query) {
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
  printLocation(weather.lat, weather.lon)
  temperature.innerHTML = weather.temp + '&#176;'
  image.src = 'https://openweathermap.org/img/w/' + weather.img + '.png'
  description.innerHTML = weather.desc
}

window.onload = function() {
  weatherTemperature = document.getElementById('temperature');
  weatherCity = document.getElementById('city');
  weatherImage = document.getElementById('image');
  weatherDescription = document.getElementById('description');
  // getLatLogvalues();
  getTemperatureChoice();
  checkWeather();
}
