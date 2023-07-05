const city = document.querySelector(".city");
const temp = document.querySelector(".temp");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weather = document.querySelector(".weather");
const error = document.querySelector(".error");

const apiKey = "0d3948c161c5ce443574291b7a7d0670";
const apiURL = `https://api.openweathermap.org/data/2.5/weather?&appid=${apiKey}&units=metric&q=`;

async function getWeather(cityName) {
  const resp = await fetch(apiURL + cityName);
  if (resp.status == 404) {
    error.style.display = "block";
    weather.style.display = "none";
    searchBox.value = " "
  } else {
    const data = await resp.json();

    city.innerHTML = data.name;
    temp.innerHTML = Math.round(data.main.temp) + "°C";
    humidity.innerHTML = data.main.humidity + "%";
    wind.innerHTML = data.wind.speed + " Km/h";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/mist.png";
    }
    weather.style.display = "block";
    error.style.display = "none";
    searchBox.value = " "
  }
}
searchBtn.addEventListener("click", (eo) => {
  getWeather(searchBox.value);
});
