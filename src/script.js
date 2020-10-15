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

function showForecast(response) {

  //Forecast time
let timeFirstForecast = document.querySelector("#forecast-time-1");
timeFirstForecast.innerHTML = response.data.list[1].dt_txt.slice(11, 16);

let timeSecondForecast = document.querySelector("#forecast-time-2");
timeSecondForecast.innerHTML = response.data.list[2].dt_txt.slice(11, 16);

let timeThirdForecast = document.querySelector("#forecast-time-3");
timeThirdForecast.innerHTML = response.data.list[3].dt_txt.slice(11, 16);

let timeFourthForecast = document.querySelector("#forecast-time-4");
timeFourthForecast.innerHTML = response.data.list[4].dt_txt.slice(11, 16);

let timeFifthForecast = document.querySelector("#forecast-time-5");
timeFifthForecast.innerHTML = response.data.list[5].dt_txt.slice(11, 16);

  //Forecast icon
let iconFirstForecast = document.querySelector("#forecast-image-1");
iconFirstForecast.setAttribute("src",`https://openweathermap.org/img/wn/${response.data.list[1].weather[0].icon}@2x.png`);
iconFirstForecast.setAttribute("alt", response.data.list[1].weather[0].description);

let iconSecondForecast = document.querySelector("#forecast-image-2");
iconSecondForecast.setAttribute("src",`https://openweathermap.org/img/wn/${response.data.list[2].weather[0].icon}@2x.png`);
iconSecondForecast.setAttribute("alt", response.data.list[2].weather[0].description);

let iconThirdForecast = document.querySelector("#forecast-image-3");
iconThirdForecast.setAttribute("src",`https://openweathermap.org/img/wn/${response.data.list[3].weather[0].icon}@2x.png`);
iconThirdForecast.setAttribute("alt", response.data.list[3].weather[0].description);

let iconFourthForecast = document.querySelector("#forecast-image-4");
iconFourthForecast.setAttribute("src",`https://openweathermap.org/img/wn/${response.data.list[4].weather[0].icon}@2x.png`);
iconFourthForecast.setAttribute("alt", response.data.list[4].weather[0].description);

let iconFifthForecast = document.querySelector("#forecast-image-5");
iconFifthForecast.setAttribute("src",`https://openweathermap.org/img/wn/${response.data.list[5].weather[0].icon}@2x.png`);
iconFifthForecast.setAttribute("alt", response.data.list[5].weather[0].description);

  //Forecast temp-max
let maxTempFirstForecast = document.querySelector("#forecast-max-temp-1");
maxTempFirstForecast.innerHTML = Math.round(response.data.list[0].main.temp);

let maxTempSecondForecast = document.querySelector("#forecast-max-temp-2");
maxTempSecondForecast.innerHTML = Math.round(response.data.list[1].main.temp);

let maxTempThirdForecast = document.querySelector("#forecast-max-temp-3");
maxTempThirdForecast.innerHTML = Math.round(response.data.list[2].main.temp);

let maxTempFourthForecast = document.querySelector("#forecast-max-temp-4");
maxTempFourthForecast.innerHTML = Math.round(response.data.list[3].main.temp);

let maxTempFifthForecast = document.querySelector("#forecast-max-temp-5");
maxTempFifthForecast.innerHTML = Math.round(response.data.list[4].main.temp);


//Forecast humidity
let humidityFirstForecast = document.querySelector("#forecast-humidity-1");
humidityFirstForecast.innerHTML = `${Math.round(response.data.list[0].main.humidity)}%`;

let humiditySecondForecast = document.querySelector("#forecast-humidity-2");
humiditySecondForecast.innerHTML = `${Math.round(response.data.list[1].main.humidity)}%`;

let humidityThirdForecast = document.querySelector("#forecast-humidity-3");
humidityThirdForecast.innerHTML = `${Math.round(response.data.list[2].main.humidity)}%`;

let humidityFourthForecast = document.querySelector("#forecast-humidity-4");
humidityFourthForecast.innerHTML = `${Math.round(response.data.list[3].main.humidity)}%`;

let humidityFifthForecast = document.querySelector("#forecast-humidity-5");
humidityFifthForecast.innerHTML = `${Math.round(response.data.list[4].main.humidity)}%`;

//Forecast wind speed
let windFirstForecast = document.querySelector("#forecast-wind-1");
console.log(response);
windFirstForecast.innerHTML = `${Math.round(response.data.list[0].wind.speed)} mph`;

let windSecondForecast = document.querySelector("#forecast-wind-2");
windSecondForecast.innerHTML = `${Math.round(response.data.list[1].wind.speed)} mph`;

let windThirdForecast = document.querySelector("#forecast-wind-3");
windThirdForecast.innerHTML = `${Math.round(response.data.list[2].wind.speed)} mph`;

let windFourthForecast = document.querySelector("#forecast-wind-4");
windFourthForecast.innerHTML = `${Math.round(response.data.list[3].wind.speed)} mph`;

let windFifthForecast = document.querySelector("#forecast-wind-5");
windFifthForecast.innerHTML = `${Math.round(response.data.list[4].wind.speed)} mph`;
}

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