
var CityEl = document.getElementById("city-name");
var submitBtn = document.getElementById("submit-btn");
var currentCastEl = document.getElementById("current-cast");
var fiveDayEl = document.getElementById("5day");

var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=atlanta&appid=f4b298376e14c62eae2d80f4db99a6db";
var api = fetch(apiUrl).then(function(response){
    if(response.ok){
        response.json().then(function(data){
            console.log(data);
        })
    }
});
