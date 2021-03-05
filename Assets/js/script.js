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
    // alert("Please enter your city");
  }
};

let getWeatherInfo = function (cityName) {
  let API_KEY = "fd94b557d7ee46fb855777883ef6cbcc";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;
  

  console.log(cityName);
  fetch(url).then(function (response) {
    if (response.ok) {
      console.log(response);
      response.json().then(function (data) {
        console.log(data)
      });
    } else {
      alert("Error: " + response.statusText);
    }
  })
    .catch(function (e) {
      alert("Unable to find your city");
    });
};

weatherFormEl.addEventListener("submit", formSubmitHandler);