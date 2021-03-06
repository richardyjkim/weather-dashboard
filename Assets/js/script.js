const API_KEY = "fd94b557d7ee46fb855777883ef6cbcc";
let weatherFormEl = document.getElementById("weather-form");
let cityTermEl = document.getElementById("city-name");
let weatherContainerEl = document.getElementById("weather-container");

let formSubmitHandler = function (event) {
  let cityName = cityTermEl.value.trim();
  event.preventDefault();
  if (cityName) {
    getWeatherInfo(cityName);
    getFivedayInfo(cityName);
    weatherContainerEl.innerHTML = "";
    cityTermEl.value = "";
  } else {
    alert("Please enter your city");
  }
};

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
  console.log(cityName);
  let FiveUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}`;
  fetch(FiveUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
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
  weatherEl.classList = "container flex-row justify-space-between align-center";
  
  let weatherInfoEl = document.createElement("div");

  // create a element to hold current city name
  let cityTitleEl = document.createElement("h2");
  // current time in string
  data.dt = new Date().toLocaleDateString();
  // get icon
  let weatherIcon = data.weather[0].icon;
  getWeatherIcon = `https:///openweathermap.org/img/w/${weatherIcon}.png`;
  let getWeatherIconEl = document.createElement("img");
  getWeatherIconEl.setAttribute("src", getWeatherIcon);
  
  cityTitleEl.textContent = data.name + " (" + data.dt + ")";
  // append to Title
  cityTitleEl.appendChild(getWeatherIconEl);
  weatherContainerEl.appendChild(cityTitleEl);
  cityTitleEl.classList = "container flex-row align-center";
  

  // get weather info
  // temp
  let cityTemperatureInfoEl = document.createElement("div");
  let currentTemperature = Math.floor((data.main.temp-273.15)*1.8)+32+ "°F";
  
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



// displayWeather(weather, cityName);
weatherFormEl.addEventListener("submit", formSubmitHandler);