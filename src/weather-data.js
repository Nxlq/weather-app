async function fetchCurrentWeather() {
  const response = await fetch(
    "http://api.weatherapi.com/v1/current.json?key=9075e974d8924af5855180341233103&q=11209&aqi=no",
    { mode: "cors" }
  );
  const currentData = await response.json();

  return currentData;
}

export default fetchCurrentWeather;
