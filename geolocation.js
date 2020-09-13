     // variable declaration / selecting the dom elements.
     var country = document.getElementById('country');
     var state = document.getElementById('state');
     var city = document.getElementById('city');
     var flag = document.getElementById('flag');

    $("#wrapper-geolocation").ready(function(){

    if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
    console.log(position);

    const api_url = "https://api.opencagedata.com/geocode/v1/json?q="+ position.coords.latitude + ","+position.coords.longitude +"&key={}&sensor=false";

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
