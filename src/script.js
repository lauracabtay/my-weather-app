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
return `${currentDay}, ${currentHour}:${currentMinute}`;
}

// Feature 2 -  Connect Open Weather API - When searching city, display city name and weather info
function showWeather(response) {
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;

  let temp = document.querySelector("#temperature-now");
  temp.innerHTML = Math.round(response.data.main.temp);

  let description = document.querySelector("#current-weather");
  description.innerHTML = response.data.weather[0].description;

  let humidity = document.querySelector("#current-humidity");
  humidity.innerHTML = `${response.data.main.humidity}%`;

  let windSpeed = document.querySelector("#current-wind-speed");
  windSpeed.innerHTML = `${Math.round(response.data.wind.speed)} mph`;

  let date = document.querySelector("#date");
  date.innerHTML = formatDate(response.data.dt * 1000);

  let icon = document.querySelector("#weather-icon");
  icon.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  icon.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "528c21b30b50eb31aa5276a8d38b3d22";
  let unit = "metric";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showWeather);
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

search("London");

let searchButton = document.querySelector("#search-form");
searchButton.addEventListener("submit", searchCity);

// Feature 3 - Geolocation
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

function searchLocation() {
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

let geolocationButton = document.querySelector("#current-location");
geolocationButton.addEventListener("click", searchLocation);