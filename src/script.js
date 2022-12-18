let now = new Date();
let date = now.getDate();
let hour = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();
let seconds = now.getSeconds();

let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

let todayDate = document.querySelector("h3");
todayDate.innerHTML = month + " " + date + ", " + year;

let todayTime = document.querySelector("h4");
todayTime.innerHTML = hour + ":" + minutes;

function todayTemp(event) {
  event.preventDefault();
  let fLink = document.querySelector("#f-degree");
  fLink.innerHTML = 81;
  let clink = document.querySelector("#c-degree");
  clink.innerHTML = 27;
  clink.addEventListener("click");
}
let mainTemp = document.querySelector("#today-temp");
mainTemp.addEventListener("click", todayTemp);

function displayWeatherCondition(response) {
  let h2 = document.querySelector("h2");
  document.querySelector("h2") == response.data.name;
  document.querySelector("#today-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  humidity.innerHTML = "Humidity: " + response.data.main.humidity;
  wind.innerHTML = "Wind: " + Math.round(response.data.wind.speed);
}

function citySearch(city) {
  let apiKey = "a33b693cfbefd271b0ed075f9a8f65f0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function submitNewTemp(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search").value;
  citySearch(city);
  let cityName = document.querySelector("h2");
  cityName.innerHTML = city;
}

let searchBar = document.querySelector("#search-bar");
searchBar.addEventListener("submit", submitNewTemp);

function directLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "a33b693cfbefd271b0ed075f9a8f65f0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(directLocation);
}

let currentButton = document.querySelector("#get-current-location");
currentButton.addEventListener("click", getCurrentLocation);
