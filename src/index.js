import fetchCurrentWeather from "./weather-data";

window.addEventListener("DOMContentLoaded", async () => {
  const data = await fetchCurrentWeather();
  populateWeatherDisplay();
});
