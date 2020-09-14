
var cityEl = document.getElementById("city-name");
var submitBtn = document.getElementById("submit-btn");
var currentCastEl = document.getElementById("current-cast");
var fiveDayEl = document.getElementById("five-day");

var CityName = cityEl;
var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=atlanta&units=imperial&appid=f4b298376e14c62eae2d80f4db99a6db";
var api = fetch(apiUrl).then(function(response){
    if(response.ok){
        response.json().then(function(data){
            console.log(data);
            console.log(data.main.temp)
            displayCast(data);
        });
    };
});

var displayCast = function(data){
    var titleEl = document.createElement("h2");
    titleEl.textContent = data.name + ' (' + moment().format('l') + ')';

    var iconCode =data.weather[0].icon;
    var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png"; 
    var iconSpan = document.createElement("img");
    iconSpan.setAttribute("src", iconUrl);
    iconSpan.setAttribute("alt", "weather icon");

    titleEl.appendChild(iconSpan);
    currentCastEl.appendChild(titleEl);

    var tempEl = document.createElement("div");
    tempEl.textContent = 'Temperature: ' + data.main.temp.toFixed(2) + '° F';
    currentCastEl.appendChild(tempEl);

    var humidityEl = document.createElement("div");
    humidityEl.textContent = 'Humidity: ' + data.main.humidity + '%';
    currentCastEl.appendChild(humidityEl);

    var windEl = document.createElement("div");
    windEl.textContent = 'Wind Speed: ' + data.wind.speed + 'MPH';
    currentCastEl.appendChild(windEl);

    var apiFive = "https://api.openweathermap.org/data/2.5/forecast?q=" + data.name + "&appid=f4b298376e14c62eae2d80f4db99a6db";
    fetch(apiFive).then(function(response){
        response.json().then(function(five){
            displayFive(five);
        });
    });    

    var apiUv = "http://api.openweathermap.org/data/2.5/uvi?appid=f4b298376e14c62eae2d80f4db99a6db&lat=" + data.coord.lat + "&lon=" + data.coord.lon;
    fetch(apiUv).then(function(response){
        response.json().then(function(uv){
            displayUv(uv);
        });
        
    });
};

var displayUv = function(uv){
    var uvEl = document.createElement("div");
    uvEl.innerHTML = "UV Index: ";

    var uvVal = document.createElement("span");
    uvVal.setAttribute("class", "bg-danger text-white rounded uv");
    uvVal.textContent = uv.value;

    uvEl.appendChild(uvVal);
    currentCastEl.appendChild(uvEl);
};

var displayFive = function(five){
    var dailyTitle = document.createElement("h2");
    dailyTitle.textContent = "5 Day Forecast: "
    fiveDayEl.appendChild(dailyTitle);

    var dailyContainer = document.createElement("div");
    dailyContainer.setAttribute("class", "row justify-content-between");
    fiveDayEl.appendChild(dailyContainer);

    console.log(five)
    var forecast = five.list;
    console.log(forecast)
    for(i=7; i < forecast.length; i=i+8){
        var dailyEl = document.createElement("div");
        dailyEl.setAttribute("class", "card col bg-primary text-white daily");
        //dailyEl.textContent = forecast[i].dt_txt;
        dailyContainer.appendChild(dailyEl);
        console.log(forecast[i]);
    }
    
}