$(document).ready(function () {
    $('#search-form').submit(function (event) {
        event.preventDefault();
        var city = $('#city-input').val();
        getWeather(city);
        $('#city-input').val('');
    });

    function getWeather(city) {
        // Make API call to fetch weather data for the city
        // Parse the response and display current weather and forecast



    }

    function displayCurrentWeather(data) {
        // Display current weather information
        // append
    }

    function displayForecast(data) {
        // Display 5-day forecast
        // append
    }

    function addToSearchHistory(city) {
        // Add searched city to the search history
        //local storage
    }

    $('#search-history').on('click', '.city-item', function () {
        var city = $(this).text();
        getWeather(city);
    });
});
