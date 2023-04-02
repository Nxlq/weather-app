import fetchCurrentWeather from "./weather-data";
import renderWeatherDisplay from "./weather-display-view";

window.addEventListener("DOMContentLoaded", async () => {
  const data = await fetchCurrentWeather();
  console.log(data);
  renderWeatherDisplay(data);
});
