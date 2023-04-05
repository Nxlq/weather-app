import fetchCurrentWeather from "./weather-data";
import renderWeatherContents from "./weather-display-view";

const searchBar = document.getElementById("search-location-input");

async function locationReqSuccess(position) {
  const { latitude, longitude } = position.coords;
  const data = await fetchCurrentWeather(`${latitude},${longitude}`);

  renderWeatherContents(data);
  return data;
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

searchBar.addEventListener("keyup", async (e) => {
  if (e.code.toLowerCase() === "enter") {
    const data = await fetchCurrentWeather(searchBar.value);
    console.log(data);
    renderWeatherContents(data);
  }
});
