function generateWeatherDisplayDom(data) {
  console.log(data);
  // generate weather display container
  const weatherDisplay = document.createElement("div");
  weatherDisplay.id = "weather-display";

  // generate weather/location display
  const tempAndLocationContainer = document.createElement("div");
  tempAndLocationContainer.id = "container-weather-location-info";

  const temperature = document.createElement("span");
  temperature.id = "temperature-display";
  temperature.textContent = `${Math.round(data.current.temp_f)}°F`;

  const location = document.createElement("span");
  location.id = "location-display";
  location.textContent = `${data.location.name}, ${data.location.region}, ${data.location.country}`;

  tempAndLocationContainer.append(temperature, location);

  // generate time and date info
  const timeAndDateContainer = document.createElement("div");
  timeAndDateContainer.id = "container-date-info";

  const time = document.createElement("span");
  time.id = "time-display";
  time.textContent = `${data.formattedInfo.time}`;

  const date = document.createElement("span");
  date.id = "date-display";
  date.textContent = `${data.formattedInfo.monthAbbreviation} ${data.formattedInfo.dayOfMonth}, ${data.formattedInfo.day}`;

  timeAndDateContainer.append(time, date);

  weatherDisplay.append(tempAndLocationContainer, timeAndDateContainer);

  return weatherDisplay;
}

function renderWeatherDisplay(data) {
  const appContent = document.getElementById("app-content");
  appContent.append(generateWeatherDisplayDom(data));
}

export default renderWeatherDisplay;
