const apiKey = '6014d57e0a8d2106c2c3b407eb70a360';
const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const currentWeatherDiv = document.getElementById('current-weather');
const forecastDiv = document.getElementById('forecast');
const searchHistoryDiv = document.getElementById('search-history');

searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const cityName = cityInput.value.trim();
    if (cityName !== '') {
        getCurrentWeather(cityName);
        getForecast(cityName);
        addToSearchHistory(cityName);
        cityInput.value = '';
    }
});

function getCurrentWeather(city) {
    // fetch(`https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=${apiKey}
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}
        `)
        .then(response => response.json())
        .then(data => {
            console.log("Returned Data: ", data);
            const cityName = data.name;
            const date = new Date(data.dt * 1000).toLocaleDateString();
            const icon = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
            const temperature = data.main.temp;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;
            currentWeatherDiv.innerHTML = `
        <h2>${cityName} (${date})</h2>
        <img src="${icon}" alt="${data.weather[0].description}">
        <p>Temperature: ${temperature}°C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
      `;
        })
        .catch(error => console.error('Error fetching current weather:', error));
}

function getForecast(city) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            const forecastData = data.list.filter(item => item.dt_txt.includes('12:00:00'));
            forecastDiv.innerHTML = '';
            forecastData.forEach(item => {
                const date = new Date(item.dt * 1000).toLocaleDateString();
                const icon = `https://openweathermap.org/img/w/${item.weather[0].icon}.png`;
                const temperature = item.main.temp;
                const humidity = item.main.humidity;
                const windSpeed = item.wind.speed;

                const forecastItem = document.createElement('div');
                forecastItem.classList.add('forecast-item');
                forecastItem.innerHTML = `
          <h3>${date}</h3>
          <img src="${icon}" alt="${item.weather[0].description}">
          <p>Temperature: ${temperature}°C</p>
          <p>Humidity: ${humidity}%</p>
          <p>Wind Speed: ${windSpeed} m/s</p>
        `;
                forecastDiv.appendChild(forecastItem);
            });
        })
        .catch(error => console.error('Error fetching forecast:', error));
}

function addToSearchHistory(city) {
    const listItem = document.createElement('div');
    listItem.textContent = city;
    listItem.classList.add('search-item');
    listItem.addEventListener('click', function (event) {
        console.log("Click...");
        console.log("City: ", city);
        getCurrentWeather(city);
        getForecast(city);
    });
    searchHistoryDiv.appendChild(listItem);
}
