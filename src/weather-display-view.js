async function fetchWeatherGif(string) {
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=wbrSw8VyWBlLS4akOVt1qa9fZP9rXC40&s=${string}`,
    { mode: "cors" }
  );
  const data = await response.json();
  const gifURL = data.data.images.original.url;
  return gifURL;
}

function updateWeatherBG(url) {
  const weatherDisplayEl = document.getElementById("weather-display");
  weatherDisplayEl.style.backgroundImage = url;
}

async function setWeatherBackgroundImage(data) {
  console.log({ data });
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
    const gifURL = await fetchWeatherGif("nighttime");
    updateWeatherBG(`url(${gifURL})`);
    return;
  }

  // if it's day time

  // IF SUNNY
  if (sunnyCodes.includes(curWeatherCode)) {
    const gifURL = await fetchWeatherGif("sun");
    updateWeatherBG(`url(${gifURL})`);

    return;
  }

  // IF CLOUDY
  if (cloudyCodes.includes(curWeatherCode)) {
    const gifURL = await fetchWeatherGif("cloudy");
    updateWeatherBG(`url(${gifURL})`);
    return;
  }

  // IF RAINY
  if (rainyCodes.includes(curWeatherCode)) {
    const gifURL = await fetchWeatherGif("rainy");
    updateWeatherBG(`url(${gifURL})`);
    return;
  }

  // IF SNOWY
  if (snowyCodes.includes(curWeatherCode)) {
    const gifURL = await fetchWeatherGif("snowy");
    updateWeatherBG(`url(${gifURL})`);
  }

  // IF STORMY
  if (stormyCodes.includes(curWeatherCode)) {
    const gifURL = await fetch("storm");
    updateWeatherBG(`url(${gifURL})`);
  }
}

function generateWeatherDisplayDom(data) {
  const weatherDisplayCur = document.getElementById("weather-display");
  // check if there is a current weather display, remove if so before generating a new one
  if (weatherDisplayCur) {
    weatherDisplayCur.remove();
  }
  console.log(data);
  // generate weather display container
  const weatherDisplay = document.createElement("div");
  weatherDisplay.id = "weather-display";

  // generate icon for weather display
  const weatherIcon = document.createElement("img");
  weatherIcon.id = "weather-display-icon";
  weatherIcon.src = `./weather-icons/${data.current.is_day ? "day" : "night"}/${
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

function generateAndRenderHumidity(data) {
  const humidityStat = data.current.humidity;
  const humidityTextContainer = document.getElementById("humidity-text");

  // if element already exists then just change the text content
  if (humidityTextContainer.childElementCount === 2) {
    humidityTextContainer.lastChild.textContent = `${humidityStat}%`;
    return;
  }

  const span = document.createElement("span");
  span.textContent = `${humidityStat}%`;

  humidityTextContainer.appendChild(span);
}

function generateAndRenderUvIndex(data) {
  const uvIndex = data.current.uv;
  const uvIndexTextContainer = document.getElementById("uv-index-text");

  // if element already exists then just change the text content
  if (uvIndexTextContainer.childElementCount === 2) {
    uvIndexTextContainer.lastChild.textContent = `${uvIndex} of 10`;
    return;
  }

  const span = document.createElement("span");
  span.textContent = `${uvIndex} of 10`;

  uvIndexTextContainer.appendChild(span);
}

function generateAndRenderSunrise(data) {
  const sunriseStat = data.forecast.forecastday[0].astro.sunrise;
  const sunriseTextContainer = document.getElementById("sunrise-text");

  // if element already exists then just change the text content
  if (sunriseTextContainer.childElementCount === 2) {
    sunriseTextContainer.lastChild.textContent = `${sunriseStat}`;
    return;
  }

  const span = document.createElement("span");
  span.textContent = `${sunriseStat}`;

  sunriseTextContainer.appendChild(span);
}

function generateAndRenderSunset(data) {
  const sunsetStat = data.forecast.forecastday[0].astro.sunset;
  const sunsetTextContainer = document.getElementById("sunset-text");

  // if element already exists then just change the text content
  if (sunsetTextContainer.childElementCount === 2) {
    sunsetTextContainer.lastChild.textContent = `${sunsetStat}`;
    return;
  }

  const span = document.createElement("span");
  span.textContent = `${sunsetStat}`;

  sunsetTextContainer.appendChild(span);
}

function renderMiscWeatherStats(data) {
  generateAndRenderHumidity(data);
  generateAndRenderUvIndex(data);
  generateAndRenderSunrise(data);
  generateAndRenderSunset(data);
}

function renderWeatherDisplay(data) {
  const appContent = document.getElementById("app-content");
  appContent.append(generateWeatherDisplayDom(data));
}

function createTempChart(data) {
  const chartContainer = document.getElementById("chart-container");

  // if a chart already exists then remove it first
  if (chartContainer.hasChildNodes) {
    chartContainer.removeChild(chartContainer.firstElementChild);
  }

  const ctx = document.createElement("canvas");
  ctx.id = "myChart";
  chartContainer.appendChild(ctx);

  const maxTempsArr = data.forecast.forecastday.map(
    (day) => `${day.day.maxtemp_f}`
  );
  const minTempsArr = data.forecast.forecastday.map(
    (day) => `${day.day.mintemp_f}`
  );
  const labelsArr = data.forecast.forecastday.map(
    (day) =>
      `${data.formattedInfo.monthAbbreviation} ${parseInt(
        day.date.split("-")[2],
        10
      )}`
  );

  // generate/render chart
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: labelsArr,
      datasets: [
        {
          label: "Max Temp °F",
          data: maxTempsArr,
          borderWidth: 1,
        },
        {
          label: "Min Temp °F",
          data: minTempsArr,
          borderWidth: 1,
        },
      ],
    },
    options: {
      plugins: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    },
  });
}

export default function renderWeatherContents(data) {
  renderWeatherDisplay(data);
  renderMiscWeatherStats(data);
  createTempChart(data);
  setWeatherBackgroundImage(data);
}
