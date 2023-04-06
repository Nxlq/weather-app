async function fetchCurrentWeather(locationQuery) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=9075e974d8924af5855180341233103&q=${locationQuery}&days=7&aqi=no`,
    { mode: "cors" }
  );

  const data = await response.json();

  // add parsed info onto data object
  data.formattedInfo = getFormattedInfo(data);

  console.log(data);
  return data;
}

export default fetchCurrentWeather;

function parseLocalTime(localTimeStr) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [date, time] = localTimeStr.split(" ");

  // date split = [year, month, day]
  const monthIndex = parseInt(date.split("-")[1], 10) - 1;
  const monthAbbreviation = months[monthIndex].slice(0, 3);
  const dayOfMonth = parseInt(date.split("-")[2], 10);

  return { monthAbbreviation, dayOfMonth, time };
}

function parseCurrentDayOfWeek(localTimeStr) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const dayIndex = new Date(`${localTimeStr}`).getDay();
  const currentDay = daysOfWeek[dayIndex];

  return currentDay;
}

function parseWeatherIcon(currentConditionObj) {
  const iconAPILink = currentConditionObj.icon;
  const weatherIcon = iconAPILink
    .split("/")
    .find((str) => str.includes(".png"));

  return weatherIcon;
}

// this function calls all data parsing functions and returns a formatted info obj which is added to the api response obj when fetched
function getFormattedInfo(data) {
  const { monthAbbreviation, dayOfMonth, time } = parseLocalTime(
    data.location.localtime
  );
  const day = parseCurrentDayOfWeek(data.location.localtime);
  const weatherIcon = parseWeatherIcon(data.current.condition);

  return { monthAbbreviation, dayOfMonth, time, day, weatherIcon };
}
