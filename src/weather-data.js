async function fetchCurrentWeather() {
  const response = await fetch(
    "http://api.weatherapi.com/v1/current.json?key=9075e974d8924af5855180341233103&q=11209&aqi=no",
    { mode: "cors" }
  );
  const currentData = await response.json();

  // add parsed info onto currentData object
  currentData.formattedInfo = parseLocalTime(currentData.location.localtime);
  currentData.formattedInfo.day = parseCurrentDayOfWeek(
    currentData.location.localtime
  );

  console.log(currentData);
  return currentData;
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
