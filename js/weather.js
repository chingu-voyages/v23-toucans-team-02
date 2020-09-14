const apiKey = ''
var weatherTemperature;
var weatherCity;
var weatherDescription;
var weatherImage;
var measurementChoice;
var units;
var storedUnits;

function checkWeather() {

  var checkWeatherButton = document.getElementById('check-button')

  checkWeatherButton.onclick = function() {
    var checkWeatherInput = document.getElementById('check-input').value
    getTemperatureChoice();
    getWeather(checkWeatherInput);
  }

  if (localStorage.getItem('weatherInput') !== null) {
    document.getElementById('check-input').value = localStorage.getItem('weatherInput');
    var checkWeatherInput = document.getElementById('check-input').value
    getTemperatureChoice();
    getWeather(checkWeatherInput);
  }
}

function getTemperatureChoice() {
  let measurementChoice = localStorage.getItem('tempChooser');

    if (measurementChoice === "imperial") {
      document.getElementById('imperial').checked = true;
      document.getElementById('metric').checked = false;
      units= "imperial";
    } else if (measurementChoice === "metric") {
      document.getElementById('imperial').checked = false;
      document.getElementById('metric').checked = true;
      units="metric";
    };
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
    units="imperial";
  } else {
    document.getElementById("metric").checked = true;
    units="metric";
  };

  storeTemperatureChoice();
  checkWeather();
}

function getWeather(checkWeatherInput) {
  const method = isNaN(checkWeatherInput) ? 'q' : 'zip'
  const query = `https://api.openweathermap.org/data/2.5/weather?${method}=${checkWeatherInput}&units=${units}&APPID=${apiKey}`

  localStorage.setItem('weatherInput', checkWeatherInput);

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
    weather.desc = data.weather[0].main
    update(weather)
  }).catch(err => {
    console.log(err);
    alert('Oops! That\'s not a city! Try again.')
  })
}

function update(weather) {
  temperature.innerHTML = weather.temp + '&#176;'
  city.innerHTML = weather.city
  image.src = 'https://openweathermap.org/img/w/' + weather.img + '.png'
}

window.onload = function() {
  weatherTemperature = document.getElementById('temperature');
  weatherCity = document.getElementById('city');
  weatherImage = document.getElementById('image');

  getTemperatureChoice();
  checkWeather();
}
