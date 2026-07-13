async function getWeather() {
  let city = document.getElementById("city").value;

  if (city.trim() === "") {
    document.getElementById("errorMessage").innerText =
      "Please enter your city.";
    document.getElementById("weatherDetails").style.display = "none";
    return;
  }
  try {
    let apiKey = "0b4c273c50c65bebbf27783fa26a0082";

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    let response = await fetch(url);
    let data = await response.json();

    if (data.cod == "404") {
      document.getElementById("errorMessage").innerText = "City not found.";
      document.getElementById("weatherDetails").style.display = "none";
      return;
    }

    document.getElementById("errorMessage").innerText = "";

    document.getElementById("cityName").innerText = data.name;
    document.getElementById("temperature").innerText =
      `Temperature: ${data.main.temp}°C`;
    document.getElementById("humidity").innerText =
      `Humidity: ${data.main.humidity}%`;
    document.getElementById("windSpeed").innerText =
      `Wind Speed: ${data.wind.speed} m/s`;
    document.getElementById("condition").innerText =
      `Condition: ${data.weather[0].main}`;

    document.getElementById("weatherDetails").style.display = "block";

    document.getElementById("weatherIcon").src =
      `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;

    document.getElementById("dateTime").innerText = new Date().toLocaleString();
  } catch (error) {
    document.getElementById("errorMessage").innerText =
      "Something went wrong. Please check your internet connection.";
    document.getElementById("weatherDetails").style.display = "none";
  }
}

document.getElementById("city").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    getWeather();
  }
});
