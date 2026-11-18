const apiKey = "fb71706f512dc70891ecfb94845b8a3f";

async function getWeather() {

    const cityInput = document.getElementById("city");
    const city = cityInput.value.trim();

    const message = document.getElementById("message");
    const weatherInfo = document.getElementById("weatherInfo");
    const searchBtn = document.getElementById("searchBtn");

    // Check empty input
    if (city === "") {
        message.innerText = "Please enter a city name!";
        weatherInfo.hidden = true;
        return;
    }

    // Check API key
    if (apiKey === "YOUR_API_KEY") {
        message.innerText = "Please add your OpenWeatherMap API key.";
        weatherInfo.hidden = true;
        return;
    }

    message.innerText = "Fetching weather information...";
    weatherInfo.hidden = true;
    searchBtn.disabled = true;

    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    try {

        const response = await fetch(url);
        const data = await response.json();

        // Handle API errors
        if (!response.ok) {
            throw new Error(data.message || "Unable to get weather data");
        }

        // Display city name
        document.getElementById("cityName").innerText =
            data.name + ", " + data.sys.country;

        // Display temperature
        document.getElementById("temperature").innerText =
            Math.round(data.main.temp) + "°C";

        // Display weather condition
        document.getElementById("description").innerText =
            data.weather[0].description;

        // Display weather icon
        document.getElementById("weatherIcon").src =
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        document.getElementById("weatherIcon").alt =
            data.weather[0].description;

        // Display humidity
        document.getElementById("humidity").innerText =
            data.main.humidity + "%";

        // Display wind speed
        document.getElementById("wind").innerText =
            data.wind.speed + " m/s";

        // Display feels like temperature
        document.getElementById("feelsLike").innerText =
            Math.round(data.main.feels_like) + "°C";

        // Display pressure
        document.getElementById("pressure").innerText =
            data.main.pressure + " hPa";

        // Show weather information
        weatherInfo.hidden = false;
        message.innerText = "Weather information updated successfully!";

    } catch (error) {

        weatherInfo.hidden = true;

        if (error.message === "Failed to fetch") {
            message.innerText =
                "Network error. Check your internet connection.";
        } else {
            message.innerText =
                "Error: " + error.message;
        }

        console.error(error);

    } finally {

        searchBtn.disabled = false;

    }
}

// Search when Enter key is pressed
document.getElementById("city").addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        getWeather();
    }

});