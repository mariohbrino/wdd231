const cityName = document.querySelector("#cityName");
const currentTemp = document.querySelector("#currentTemp");
const weatherIcon = document.querySelector("#weatherIcon");
const captionDesc = document.querySelector("figcaption");

const displayResults = (data) => {
  cityName.innerHTML = `${data.name}`;
  currentTemp.innerHTML = `${data.main.temp}&deg;F`;
  const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  let desc = data.weather[0].description;
  weatherIcon.setAttribute('src', iconsrc);
  weatherIcon.setAttribute('alt', desc);
  captionDesc.textContent = `${desc}`;
}

const fetchWeather = async () => {
  const apiKey = "090f6dc570462c17930e2526ea255867";
  const baseUrl = "https://api.openweathermap.org/data/2.5";
  const latitude = 40.52;
  const longitude = -111.86;
  const units = "imperial";

  const weatherEndpoint = new URL(`${baseUrl}/weather`);
  const params = weatherEndpoint.searchParams;

  params.append("units", units);
  params.append("lat", latitude);
  params.append("lon", longitude);
  params.append("appid", apiKey);

  try {
    const response = await fetch(weatherEndpoint);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      displayResults(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
};

const main = () => {
  fetchWeather();
};

main();
