const API_KEY = "fd94b557d7ee46fb855777883ef6cbcc";

let weatherFormEl = document.getElementById("weather-form");
let cityTermEl = document.getElementById("city-name");
let weatherContainerEl = document.getElementById("weather-container");


let formSubmitHandler = function (event) {
  event.preventDefault();

  let cityName = cityTermEl.value.trim();

  if (cityName) {
    getWeatherInfo(cityName);
    console.log(cityName);
    weatherContainerEl.innerHTML = "";
    cityTermEl.value = "";
  } else {
    console.log(cityName);
    alert("Please enter your city");
  }
};

let getWeatherInfo = function (cityName) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;

  console.log(cityName);
  fetch(url).then(function (response) {
    if (response.ok) {
      console.log(response);
      response.json().then(function (data) {
        console.log(data);
        displayWeather(data, cityName);
      });
    } else {
      alert("Error: " + response.statusText);
    }
  }).catch(function (e) {
    alert("Unable to find your city");
  });
};

let displayWeather = function (data, cityName) {
  console.log(data.name);
  console.log(cityName);

  //  create container for current city weather
  let weatherEl = document.createElement("div");
  weatherEl.classList = "list-item flex-row justify-space-between align-center";
  
  // create a span element to hold current city name
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
  weatherEl.appendChild(cityTitleEl);
  

  // get weather info
  let cityWeatherInfoEl = document.createElement("li");
  let currentTemperature = Math.floor((data.main.temp-273.15)*1.8)+32+ "°F";
  
  cityWeatherInfoEl.textContent = "Temperature: " + currentTemperature;
  
  console.log(currentTemperature);
  weatherEl.appendChild(cityWeatherInfoEl);
  

  // append to container
  weatherContainerEl.appendChild(weatherEl);
};

// displayWeather(weather, cityName);
weatherFormEl.addEventListener("submit", formSubmitHandler);