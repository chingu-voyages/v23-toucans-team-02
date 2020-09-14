const apiKey = '01488c5d026e0674a47f8899573414fb'
var weatherTemperature;
var weatherCity;
var weatherDescription;
var weatherImage;
var units;

function checkWeather() {
  setTemperatureChoice();

  var checkWeatherButton = document.getElementById('check-button')

  checkWeatherButton.onclick = function() {
    var checkWeatherInput = document.getElementById('check-input').value
    getTemperatureChoice();
    getWeather(checkWeatherInput)
  }

  if (localStorage.getItem('weatherInput') !== null) {
    document.getElementById('check-input').value = localStorage.getItem('weatherInput');
    var checkWeatherInput = document.getElementById('check-input').value
    getTemperatureChoice();
    getWeather(checkWeatherInput)
  }
}

function getTemperatureChoice() {
  let measurementChoice = localStorage.getItem('tempChooser');

  console.log("getTemp: " + measurementChoice);

  // if (measurementChoice !== null) {
    if (measurementChoice === "imperial") {
      console.log("no");
      document.getElementById('imperial').checked = true;
      document.getElementById('metric').checked = false;
    } else if (measurementChoice === "metric") {
      console.log("yes");
      document.getElementById('imperial').checked = false;
      document.getElementById('metric').checked = true;
    };

  // }
}

function setTemperatureChoice() {
  // refer to index.html to get metric or imperial
  const measurementChoice = document.getElementById("imperial").checked;

  if (measurementChoice === true) {
    units = "imperial";
    localStorage.setItem('tempChooser', "imperial");
  } else {
    units = "metric";
    localStorage.setItem('tempChooser', "metric");
  };
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

  checkWeather()
}
