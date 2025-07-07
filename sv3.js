const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your OpenWeatherMap API key

const citySelect = document.getElementById('citySelect');
const cityNameElem = document.getElementById('cityName');
const temperatureElem = document.getElementById('temperature');
const descriptionElem = document.getElementById('description');
const sunriseElem = document.getElementById('sunrise');
const sunsetElem = document.getElementById('sunset');
const weatherIconElem = document.getElementById('weatherIcon');
const forecastCardsElem = document.getElementById('forecastCards');

citySelect.addEventListener('change', () => {
  const selectedCity = citySelect.value;
  if (selectedCity === 'auto') {
    getLocationWeather();
  } else {
    getWeatherByCity(selectedCity);
  }
});

// On load, fetch weather for auto-detect
window.addEventListener('load', () => {
  getLocationWeather();
});

function getLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      fetchWeatherData(latitude, longitude);
    }, () => {
      alert('Geolocation failed. Please select a city.');
    });
  } else {
    alert('Geolocation is not supported by this browser.');
  }
}

function getWeatherByCity(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
      const { coord } = data;
      fetchWeatherData(coord.lat, coord.lon);
    })
    .catch(error => {
      console.error('Error fetching city data:', error);
      alert('Failed to fetch weather data for the selected city.');
    });
}

function fetchWeatherData(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
      updateCurrentWeather(data);
      updateForecast(data);
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      alert('Failed to fetch weather data.');
    });
}

function updateCurrentWeather(data) {
  const { current, timezone_offset } = data;
  const city = citySelect.value === 'auto' ? 'Your Location' : citySelect.value;

  cityNameElem.textContent = city;
  temperatureElem.textContent = `${Math.round(current.temp)}°C`;
  descriptionElem.textContent = current.weather[0].description;
  sunriseElem.textContent = convertUnixToTime(current.sunrise, timezone_offset);
  sunsetElem.textContent
::contentReference[oaicite:1]{index=1}
 
