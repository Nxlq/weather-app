function generateWeatherDisplayDom(data) {
  console.log(data);
  // generate weather display container
  const weatherDisplay = document.createElement("div");
  weatherDisplay.id = "weather-display";

  // generate icon for weather display
  const weatherIcon = document.createElement("img");
  weatherIcon.id = "weather-display-icon";
  weatherIcon.src = `/weather-icons/${data.current.is_day ? "day" : "night"}/${
    data.formattedInfo.weatherIcon
  }`;

  // generate weather/location display
  const tempAndLocationContainer = document.createElement("div");
  tempAndLocationContainer.id = "container-weather-location-info";

  const temperature = document.createElement("span");
  temperature.id = "temperature-display";
  temperature.textContent = `${Math.round(data.current.temp_f)}°F`;

  const location = document.createElement("span");
  location.id = "location-display";
  location.textContent = `${data.location.name}, ${data.location.region}, ${data.location.country}`;

  tempAndLocationContainer.append(weatherIcon, temperature, location);

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

function updateWeatherBG(url) {
  const weatherDisplayEl = document.getElementById("weather-display");
  weatherDisplayEl.style.backgroundImage = url;
}

function setWeatherBackgroundImage(data) {
  const weatherDisplayEl = document.getElementById("weather-display");
  const curWeatherCode = data.current.condition.code;
  const sunnyCodes = [1000, 1003];
  const cloudyCodes = [1006, 1009, 1030, 1135, 1147];
  const rainyCodes = [
    1063, 1069, 1072, 1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1192,
    1195, 1198, 1201, 1204, 1207, 1240, 1243, 1246, 1249, 1252,
  ];
  const snowyCodes = [
    1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1255, 1258,
    1261, 1264, 1279, 1282,
  ];
  const stormyCodes = [1087, 1273, 1276, 1279, 1282];

  // if it's night time
  if (!data.current.is_day) {
    updateWeatherBG(
      'url("/images/pngtree-night-forest-mountain-cartoon-background-picture-image_1599402.jpg")'
    );
    return;
  }
  // if it's day time

  // IF SUNNY
  if (sunnyCodes.includes(curWeatherCode)) {
    updateWeatherBG(
      'url("/images/pngtree-cartoon-flat-forest-landscape-travel-banner-background-picture-image_1040481.jpg")'
    );
    return;
  }

  // IF CLOUDY
  if (cloudyCodes.includes(curWeatherCode)) {
    updateWeatherBG(
      'url("/images/pngtree-dark-sky-with-dark-clouds-and-realistic-clouds-background-picture-image_1178202.jpg")'
    );
    return;
  }

  // IF RAINY
  if (rainyCodes.includes(curWeatherCode)) {
    updateWeatherBG(
      'url("/images/pngtree-people-work-on-rice-fields-in-rain-picture-image_1775117.jpg")'
    );
    return;
  }

  // IF SNOWY
  if (snowyCodes.includes(curWeatherCode)) {
    updateWeatherBG(
      'url("/images/pngtree-new-cute-snowy-cartoon-banner-on-new-clothing-in-winter-picture-image_1123861.jpg")'
    );
  }

  // IF STORMY
  if (stormyCodes.includes(curWeatherCode)) {
    updateWeatherBG(
      'url("/images/pngtree-blue-sky-and-white-clouds-weather-thunder-and-lightning-army-unity-picture-image_1118497.jpg")'
    );
  }
}

export default renderWeatherDisplay;
