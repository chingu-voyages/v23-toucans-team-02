// variable declaration / selecting the dom elements.
const country = document.getElementById("country");
const state = document.getElementById("state");
const city = document.getElementById("city");
const flag = document.getElementById("flag");

function printLocation (lat, lon) {
  console.log("printLocation");
  const api_url = "https://api.opencagedata.com/geocode/v1/json?q="
                  + lat + "," + lon +
                  "&key=e44aa2b4fab54900a703a9051f896e71&sensor=false";

  async function getLocation() {
    console.log(getLocation);
    const response = await fetch(api_url);
    const data = await response.json();

    country.textContent = data.results[0].components.country + ', ';
    state.textContent = data.results[0].components.state;
    city.textContent = data.results[0].components.county;
    // flag.textContent = data.results[0].annotations.flag;
  }
  getLocation();
}

$("#wrapper-geolocation").ready(function () {
  console.log("wrapper");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("wrapper-getCurrentPos");
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;

      document.getElementById("textLatitude").value = lat;
      document.getElementById("textLongitude").value = lon;

      document.getElementById("check-input-lat").value = lat;
      document.getElementById("check-input-log").value = lon;

      printLocation (lat, lon);

    });
  }
});
