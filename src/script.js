// Feature 1 - Display the current day and time (e.g. Thursday 15:03)

function formatDate(timestamp) {
let currentDate = new Date(timestamp);

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let currentDay = days[currentDate.getDay()];
let currentHour = currentDate.getHours();
let currentMinute = currentDate.getMinutes();

if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
if (currentMinute < 10) {
  currentMinute = `0${currentMinute}`;
}
return `${currentDay}, ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
let currentDate = new Date(timestamp);
let currentHour = currentDate.getHours();
let currentMinute = currentDate.getMinutes();

if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
if (currentMinute < 10) {
  currentMinute = `0${currentMinute}`;
}
return `${currentHour}:${currentMinute}`;
}

// Connect Open Weather API - When searching city, display city name and weather info
function showWeather(response) {
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;

  let temp = document.querySelector("#temperature-now");
  celsiusTemperature = response.data.main.temp;
  temp.innerHTML = Math.round(celsiusTemperature);

  let description = document.querySelector("#current-weather");
  description.innerHTML = response.data.weather[0].description;

  let humidity = document.querySelector("#current-humidity");
  humidity.innerHTML = `${response.data.main.humidity}%`;

  let windSpeed = document.querySelector("#current-wind-speed");
  windSpeed.innerHTML = `${Math.round(response.data.wind.speed)} mph`;

  let date = document.querySelector("#date");
  date.innerHTML = formatDate(response.data.dt * 1000);

  let icon = document.querySelector("#weather-icon");
  icon.setAttribute("src",`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  icon.setAttribute("alt", response.data.weather[0].description);

}

  // 3-hours weather forecast
function showForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
let forecast = null;

for (let index = 0; index < 5; index++) {
  forecast = response.data.list[index];
  forecastElement.innerHTML += `
    <div class="col mb-4 all-weather-cards text-center">
    <div class="card h-100 weather-card">
      <h2 class="carousel">${formatHours(forecast.dt * 1000)}</h2>
      <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" class="card-img-top" alt="sunshine"/>
      <div class="card-body">
         <h5 class="hour-temp">
            <strong class="hour-temp" id="hour-temp">${Math.round(forecast.main.temp)}°</strong>
         </h5>
         <i class="fas fa-cloud-rain img-humidity img-humidity-small"></i>
         <p class="p-humidity-small">
            ${forecast.main.humidity}%
         </p>
         </br>
         <i class="fas fa-wind img-wind img-wind-small"></i>
        <p class="p-wind-small">${Math.round(forecast.wind.speed)} mph</p>
    </div>
  </div>
  </div>
  `
}
}

//Search
function search(city) {
  let apiKey = "528c21b30b50eb31aa5276a8d38b3d22";
  let unit = "metric";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showWeather);

    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showForecast);
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  if (city) {
    let h1 = document.querySelector("h1");
    h1.innerHTML = city;
  } else {
    alert("Please enter a city or town");
  }
  search(city);
}

//Geolocation
function searchCurrentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let city = position.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = city;
  let unit = "metric";
  let apiKey = "528c21b30b50eb31aa5276a8d38b3d22";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showWeather);
}

let searchButton = document.querySelector("#search-form");
searchButton.addEventListener("submit", searchCity);

function searchLocation() {
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

// Temperature conversion to Fahrenheit
function convertToF(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature-now");
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(fahrenheitTemp);

  fahrenheitButton.classList.remove("btn-dark", "button-f");
  fahrenheitButton.classList.add("btn-primary", "button-c");
  celsiusButton.classList.remove("btn-primary", "button-c");
  celsiusButton.classList.add("btn-dark", "button-f");
}

// Temperature conversion to Celsius
function convertToC(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature-now");
  tempElement.innerHTML = Math.round(celsiusTemperature);

  fahrenheitButton.classList.add("btn-dark", "button-f");
  fahrenheitButton.classList.remove("btn-primary", "button-c");
  celsiusButton.classList.add("btn-primary", "button-c");
  celsiusButton.classList.remove("btn-dark", "button-f");
}

let geolocationButton = document.querySelector("#current-location");
geolocationButton.addEventListener("click", searchLocation);

let fahrenheitButton = document.querySelector("#button-f");
fahrenheitButton.addEventListener("click", convertToF);

let celsiusButton = document.querySelector("#button-c");
celsiusButton.addEventListener("click", convertToC);

let celsiusTemperature = null;

search("London");