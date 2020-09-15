     // variable declaration / selecting the dom elements.
     const country = document.getElementById('country');
     const state = document.getElementById('state');
     const city = document.getElementById('city');
     const flag = document.getElementById('flag');

    $("#wrapper-geolocation").ready(function(){

    if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
    console.log(position);

    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    const api_url = "https://api.opencagedata.com/geocode/v1/json?q="+ lat + ","+ lon +"&key=e44aa2b4fab54900a703a9051f896e71&sensor=false";

    async function getCityName(){
    const response = await fetch(api_url);
    const data = await response.json();

    country.textContent = data.results[0].components.country;
    state.textContent = data.results[0].components.state;
    city.textContent = data.results[0].components.county;
    flag.textContent = data.results[0].annotations.flag;
    }
    getCityName();
    })
    }
    });
