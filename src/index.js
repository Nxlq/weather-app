import fetchCurrentWeather from "./weather-data";
import renderWeatherDisplay, { fetchWeatherBG } from "./weather-display-view";
import { renderWeatherDisplay } from "./weather-display-view";

async function locationReqSuccess(position) {
  const { latitude, longitude } = position.coords;
  const currentData = await fetchCurrentWeather(`${latitude},${longitude}`);

  renderWeatherDisplay(currentData);
  return currentData;
  // return `${latitude},${longitude}`;
}

function locationReqFailed() {
  alert("Unable to retrieve position :( Try searching for a location!");
}

window.addEventListener("DOMContentLoaded", async () => {
  navigator.geolocation.getCurrentPosition(
    locationReqSuccess,
    locationReqFailed
  );
});
