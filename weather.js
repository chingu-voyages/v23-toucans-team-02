const apiKey = 'ff989f0e492da5efe6a2b71ed5697395'
var weatherTemperature;
var weatherCity;
var weatherDescription;
var weatherImage;

function checkWeather() {

  var checkWeatherButton = document.getElementById('check-button')
  checkWeatherButton.onclick = function() {
    var checkWeatherInput = document.getElementById('check-input').value
    getWeather(checkWeatherInput)
  }

  if (localStorage.getItem('weatherInput') !== null) {
    document.getElementById('check-input').value = localStorage.getItem('weatherInput');
    var checkWeatherInput = document.getElementById('check-input').value
    getWeather(checkWeatherInput)
  }
}


function getWeather(checkWeatherInput) {
  const method = isNaN(checkWeatherInput) ? 'q' : 'zip'

  // refer to index.html to get metric or imperial
  let units = "";
  units = "imperial";

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
  }).catch( err => {
    console.log(err);
    alert('Oops! That\'s not a city! Try again.')
  })
}

function update(weather) {
  temperature.innerHTML = weather.temp + '&#176;'
  city.innerHTML = weather.city
  image.src = 'https://openweathermap.org/img/w/' + weather.img + '.png'
}

window.onload = function () {
  weatherTemperature = document.getElementById('temperature');
  weatherCity = document.getElementById('city');
  weatherImage = document.getElementById('image');

  checkWeather()
}
