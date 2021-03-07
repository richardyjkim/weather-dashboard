const API_KEY = "fd94b557d7ee46fb855777883ef6cbcc";
let weatherFormEl = document.getElementById("weather-form");
let cityTermEl = document.getElementById("city-name");
let weatherContainerEl = document.getElementById("weather-container");
let searchedCities = JSON.parse(localStorage.getItem("cityname")) || [];
let cityListEl = document.getElementById("city-list-section");

let formSubmitHandler = function (event) {
  let cityName = cityTermEl.value.trim();
  event.preventDefault();
  if (cityName) {
    getWeatherInfo(cityName);
    getFivedayInfo(cityName);
    weatherContainerEl.innerHTML = "";
    cityTermEl.value = "";
    searchedCities.push(cityName);
    localStorage.setItem("cityname", JSON.stringify(searchedCities));
    displaySearchCity();
  } else {
    alert("Please enter your city");
  }
};

displaySearchCity = function () {
  cityListEl.textContent = "";
  for (let i = 0; i < searchedCities.length; i++) {
    let cityList = document.createElement("div")
    cityList.classList = "card citylist flex-row justify-space-evenly";
    cityList.setAttribute("value", searchedCities[i]);
    cityList.textContent=searchedCities[i];
    cityList.addEventListener("click", function () {
      getWeatherInfo(searchedCities[i]);
    })
    console.log(searchedCities[i]);
    cityListEl.appendChild(cityList);
  }
}

let getWeatherInfo = function (cityName) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;
  fetch(url).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayWeather(data, cityName);
      });
    } else {
      alert("Error: " + response.statusText);
    }
  }).catch(function (e) {
    alert("Unable to find your city");
  });
};

let getFivedayInfo = function (cityName) {
  let FiveUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}`;
  fetch(FiveUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayFivedays(data, cityName);
      });
    } else {
      alert("Error: " + response.statusText);
    }
  }).catch(function (e) {
    alert("Unable to find your city");
  });
};


let displayWeather = function (data, cityName) {
  //  create container for current city weather
  let weatherEl = document.createElement("div");
  let weatherInfoEl = document.createElement("div");
  weatherEl.classList = "container flex-row justify-space-between align-center";

  // create a element to hold current city name
  let cityTitleEl = document.createElement("h2");
  // current time in string
  data.dt = new Date().toLocaleDateString();
  // get icon
  let weatherIcon = data.weather[0].icon;
  let getWeatherIconEl = document.createElement("img");
  getWeatherIcon = `https:///openweathermap.org/img/w/${weatherIcon}.png`;
  getWeatherIconEl.setAttribute("src", getWeatherIcon);
  cityTitleEl.textContent = data.name + " (" + data.dt + ")";
  cityTitleEl.appendChild(getWeatherIconEl);
  weatherContainerEl.appendChild(cityTitleEl);
  cityTitleEl.classList = "container flex-row align-center";

  // get weather info
  // temp
  let cityTemperatureInfoEl = document.createElement("div");
  let currentTemperature = Math.floor((data.main.temp - 273.15) * 1.8) + 32 + "°F";
  cityTemperatureInfoEl.textContent = "Temperature: " + currentTemperature;
  weatherInfoEl.appendChild(cityTemperatureInfoEl);
  cityTemperatureInfoEl.classList = "margin-bottom flex-row justify-space-between align-center";

  // humid
  let cityHumidityInfoEl = document.createElement("div");
  let currentHumidity = data.main.humidity;
  cityHumidityInfoEl.textContent = "Humidity: " + currentHumidity + "%";
  weatherInfoEl.appendChild(cityHumidityInfoEl);
  cityHumidityInfoEl.classList = "margin-bottom flex-row justify-space-between align-center";

  // wind Speed
  let cityWindSpeedEl = document.createElement("div");
  let currentWindSpeed = data.wind.speed;
  cityWindSpeedEl.textContent = "Wind Speed: " + currentWindSpeed + "MPH";
  weatherInfoEl.appendChild(cityWindSpeedEl);
  cityWindSpeedEl.classList = "margin-bottom flex-row justify-space-between align-center";

  // UV index
  let cityUvIndexEl = document.createElement("span");
  let lat = data.coord.lat;
  let lon = data.coord.lon;
  let UvUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${API_KEY}`

  fetch(UvUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        let currentUvIndex = data.value;
        cityUvIndexEl.textContent = "UV Index: " + currentUvIndex;
        weatherInfoEl.appendChild(cityUvIndexEl);
      });
    } else {
      cityUvIndexEl.textContent = "UV Index: Unkown";
    }
  }).catch(function (e) {
    cityUvIndexEl.textContent = "UV Index: Unkown";
  });
  cityUvIndexEl.setAttribute("class", "badge badge-danger");
  // append to container
  weatherEl.appendChild(weatherInfoEl)
  weatherContainerEl.appendChild(weatherEl);
};

// display 5 days
let displayFivedays = function (data, cityName) {
  let fivedayEl = document.querySelectorAll(".fiveday");
  for (let i = 0; i < fivedayEl.length; i++) {
    fivedayEl[i].textContent = "";
    // fivedays dates
    let fivedaysDateEl = document.createElement("p");
    let fivedaysIndex = i * 8 + 4;
    let fivedaysDate = new Date(data.list[fivedaysIndex].dt);
    let fiveDay = fivedaysDate.toLocaleDateString();
    fivedaysDateEl.setAttribute("class", "mt-3 mb-0");
    fivedaysDateEl.textContent = fiveDay;
    fivedayEl[i].append(fivedaysDateEl);
    // five days icon
    let fivedaysIconEl = document.createElement("img");
    let fivedaysIcon = data.list[fivedaysIndex].weather[0].icon
    fivedaysIconEl.setAttribute("src", `https://openweathermap.org/img/w/${fivedaysIcon}.png`);
    fivedayEl[i].append(fivedaysIconEl);
    // fiveday temperature
    let fivedayTempEl = document.createElement("p");
    fivedayTempEl.textContent = "Temp: " + Math.floor(((data.list[fivedaysIndex].main.temp - 273.15) * 1.8) + 32) + "°F";
    fivedayEl[i].append(fivedayTempEl);
    // fiveday huminity
    let fivedayHumidEl = document.createElement("p");
    fivedayHumidEl.textContent = "Humidity: " + data.list[fivedaysIndex].main.humidity + "%";
    fivedayEl[i].append(fivedayHumidEl);
  }
}


// displayWeather(weather, cityName);
weatherFormEl.addEventListener("submit", formSubmitHandler);