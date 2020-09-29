var api =
  'https://api.openweathermap.org/data/2.5/forecast?zip=94124,us&appid=ff989f0e492da5efe6a2b71ed5697395';
var iconUrlOpenWeather = 'https://openweathermap.org/img/w/';


// next day variables declaration
//var dayDisplay1 = document.getElementById('date-day1');
var desc1 = document.getElementById('desc1');
var minTemp1 = document.getElementById('min-temp1');
var maxTemp1 = document.getElementById('max-temp1');

// the second day variables declaration
//var dayDisplay2 = document.getElementById('date-day2');
var desc2 = document.getElementById('desc2');
var minTemp2 = document.getElementById('min-temp2');
var maxTemp2 = document.getElementById('max-temp2');

// the third day variables declaration
//var dayDisplay3 = document.getElementById('date-day3');
var desc3 = document.getElementById('desc3');
var minTemp3 = document.getElementById('min-temp3');
var maxTemp3 = document.getElementById('max-temp3');

// the forth day variables declaration
//var dayDisplay4 = document.getElementById('date-day4');
var desc4 = document.getElementById('desc4');
var minTemp4 = document.getElementById('min-temp4');
var maxTemp4 = document.getElementById('max-temp4');

// this function prints the four next days day date and name of day
function plusToDay(num){
  const date = new Date(Date());
  const format = { weekday: 'short', day: 'numeric' };
  date.setDate(date.getDate() + num);
  const dateLocal = date.toLocaleDateString('en-US', format);
   return dateLocal;
}
    document.getElementById('date-day1').innerHTML = plusToDay(1);
    document.getElementById('date-day2').innerHTML = plusToDay(2);
    document.getElementById('date-day3').innerHTML = plusToDay(3);
    document.getElementById('date-day4').innerHTML = plusToDay(4);


async function getForecast() {
  var response = await fetch(api);
  var data = await response.json();

  // the next day forecast
  // dayDisplay1.textContent = dateLocal;
  desc1.textContent = data.list[1].weather[0].description;
  minTemp1.textContent = data.list[1].main.temp_min;
  maxTemp1.textContent = data.list[1].main.temp_max;

  var icon1 = document.getElementById('icon1').attr = data.list[6].weather[0].icon;
  var iconUrlImage = iconUrlOpenWeather + icon1 + '.png';
  var iconImage = document.getElementById('icon-day1');
  iconImage.src = iconUrlImage;

  //the second day forecast
  desc2.textContent = data.list[2].weather[0].description;
  minTemp2.textContent = data.list[2].main.temp_min;
  maxTemp2.textContent = data.list[2].main.temp_max;

  // document.getElementById("icon2").textContent=data.list[2].weather[0].icon;
  icon2 = document.getElementById('icon2').attr = data.list[2].weather[0].icon;
  iconUrlImage = iconUrlOpenWeather + icon2 + '.png';
  iconImage = document.getElementById('icon-day2');
  iconImage.src = iconUrlImage;

  desc3.textContent = data.list[3].weather[0].description;
  minTemp3.textContent = data.list[3].main.temp_min;
  maxTemp3.textContent = data.list[3].main.temp_max;
  // document.getElementById("icon3").textContent=data.list[3].weather[0].icon;
  icon3 = document.getElementById('icon3').attr = data.list[3].weather[0].icon;
  iconUrlImage = iconUrlOpenWeather + icon3 + '.png';
  iconImage = document.getElementById('icon-day3');
  iconImage.src = iconUrlImage;

  desc4.textContent = data.list[4].weather[0].description;
  minTemp4.textContent = data.list[4].main.temp_min;
  maxTemp4.textContent = data.list[4].main.temp_max;
  // document.getElementById("icon4").textContent=data.list[4].weather[0].icon;
  icon4 = document.getElementById('icon4').attr = data.list[4].weather[0].icon;
  iconUrlImage = iconUrlOpenWeather + icon4 + '.png';
  iconImage = document.getElementById('icon-day4');
  iconImage.src = iconUrlImage;
}
getForecast();