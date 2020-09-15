
var cityEl = document.getElementById("city-name");
var submitBtn = document.getElementById("submit-btn");
var ContainerTwo = document.getElementById("containerTwo");
var ulEl = document.getElementById("city-list");


var getInfo = function(event){
    
    event.preventDefault();
    
    var CityName = cityEl.value.trim();
    if(CityName){
        cityEl.value = "";
        var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + CityName + "&units=imperial&appid=f4b298376e14c62eae2d80f4db99a6db";
        fetch(apiUrl).then(function(response){
            if(response.ok){
                response.json().then(function(data){
                    
                    displayCast(data);
                });
            };
            if(!response.ok){
                alert("Please enter a valid city name.")
            }
        });
    }
    else{
        alert("Please enter a city name.")
    }
};

var recentSearch = function(search){
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + search + "&units=imperial&appid=f4b298376e14c62eae2d80f4db99a6db";
        fetch(apiUrl).then(function(response){
                response.json().then(function(data){
                    
                    displayCast(data);
                });
        });
};

var displayCast = function(data){

    var storeCity = data.name;
    var city = JSON.parse(localStorage.getItem('city')) || [];
    if(city.indexOf(storeCity) == -1){
        city.push(storeCity);
    
        localStorage.setItem('city', JSON.stringify(city));
        displayStorage();
    }
    ContainerTwo.textContent = "";
    var currentCast = document.createElement("div");
    
    currentCast.setAttribute("id", "current-cast");
    currentCast.setAttribute("class", "card");
    ContainerTwo.appendChild(currentCast);
    

    var titleEl = document.createElement("h2");
    titleEl.setAttribute("class", "title")
    titleEl.textContent = data.name + ' (' + moment().format('l') + ') ';

    var iconCode = data.weather[0].icon;
    var iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png"; 
    var iconSpan = document.createElement("img");
    iconSpan.setAttribute("src", iconUrl);
    iconSpan.setAttribute("alt", "weather icon");

    titleEl.appendChild(iconSpan);
    currentCast.appendChild(titleEl);

    var tempEl = document.createElement("div");
    tempEl.textContent = 'Temperature: ' + data.main.temp + '° F';
    currentCast.appendChild(tempEl);

    var humidityEl = document.createElement("div");
    humidityEl.textContent = 'Humidity: ' + data.main.humidity + '%';
    currentCast.appendChild(humidityEl);

    var windEl = document.createElement("div");
    windEl.textContent = 'Wind Speed: ' + data.wind.speed + 'MPH';
    currentCast.appendChild(windEl);

    var apiFive = "https://api.openweathermap.org/data/2.5/forecast?q=" + data.name + "&units=imperial&appid=f4b298376e14c62eae2d80f4db99a6db";
    fetch(apiFive).then(function(response){
        response.json().then(function(five){
            displayFive(five);
        });
    });    

    var apiUv = "https://api.openweathermap.org/data/2.5/uvi?appid=f4b298376e14c62eae2d80f4db99a6db&lat=" + data.coord.lat + "&lon=" + data.coord.lon;
    fetch(apiUv).then(function(response){
        response.json().then(function(uv){
            var uvEl = document.createElement("div");
    uvEl.innerHTML = "UV Index: ";

    var uvVal = document.createElement("span");
    uvVal.setAttribute("class", "bg-danger text-white rounded uv");
    uvVal.textContent = uv.value;

    uvEl.appendChild(uvVal);
    currentCast.appendChild(uvEl);
        });
        
    });
};

var displayStorage = function(){
    ulEl.innerHTML = "";
    var citiesEl = JSON.parse(localStorage.getItem('city')) || [];
    console.log(citiesEl)

    for(i=0; i < citiesEl.length; i++){
        var city = document.createElement("li")
        city.setAttribute("class", "card city");
        city.setAttribute("id", [i]);
        city.textContent = citiesEl[i];
        ulEl.appendChild(city);

        $(city).click(function(){
            recentSearch(this.innerHTML);
        })

    }
}



var displayFive = function(five){

    var fiveDayEl = document.createElement("div");
    fiveDayEl.textContent = "";
    fiveDayEl.setAttribute("id", "five-day");
    ContainerTwo.appendChild(fiveDayEl);

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
        dailyEl.setAttribute("class", "card col-lg col-md-12 bg-primary text-white daily");
        dailyContainer.appendChild(dailyEl);
        console.log(forecast[i]);

        var dailyDate = document.createElement("h6");
        dailyDate.textContent = moment(forecast[i].dt_txt).format('l');
        dailyEl.appendChild(dailyDate);

        var iconCode = forecast[i].weather[0].icon;
        var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png"; 
        var iconSpan = document.createElement("img");
        iconSpan.setAttribute("src", iconUrl);
        iconSpan.setAttribute("alt", "weather icon");
        iconSpan.setAttribute("class", "img");
        dailyEl.appendChild(iconSpan);

        var dailyTemp = document.createElement("div");
        dailyTemp.textContent = "Temp: " + forecast[i].main.temp + "° F";
        dailyEl.appendChild(dailyTemp);

        var dailyHum = document.createElement("div");
        dailyHum.textContent = "Humidity: " + forecast[i].main.humidity + "%";
        dailyEl.appendChild(dailyHum);
    }
    
}

displayStorage();
submitBtn.addEventListener("submit", getInfo);