const displayCurrentWeather = (data) => {
  const cardsInfo = document.querySelector("#cardsInfo");

  const card = document.createElement("div");
  const cardHeader = document.createElement("h2");
  const cardImage = document.createElement("div");
  const cardBody = document.createElement("div");
  const cardContent = document.createElement("div");
  const currentTemp = document.createElement("p");
  const weatherIcon = document.createElement("img");
  const weatherDescr = document.createElement("p");
  const highTemp = document.createElement("p");
  const lowTemp = document.createElement("p");
  const humidity = document.createElement("p");
  const sunrise = document.createElement("p");
  const sunset = document.createElement("p");

  card.classList.add("weather-card");
  cardHeader.classList.add("weather-card-header");
  cardContent.classList.add("weather-card-content");
  cardImage.classList.add("weather-card-image");
  cardBody.classList.add("weather-card-body");

  const iconSrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  const description = data.weather[0].description;

  currentTemp.innerHTML = `${Math.round(data.main.temp)}&deg;F`;
  weatherDescr.classList.add("title-case")
  weatherDescr.textContent = `${description}`;
  highTemp.innerHTML = `High: ${Math.round(data.main.temp_max)}&deg;`;
  lowTemp.innerHTML = `Low: ${Math.round(data.main.temp_min)}&deg;`;
  humidity.innerHTML = `Humidity: ${data.main.humidity}%`;

  const sunriseDate = new Date(data.sys.sunrise * 1000);
  const sunsetDate = new Date(data.sys.sunset * 1000);

  sunrise.innerHTML = `Sunrise: ${sunriseDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  sunset.innerHTML = `Sunset: ${sunsetDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

  cardHeader.innerHTML = "Current Weather";

  weatherIcon.classList.add("weather-icon");
  weatherIcon.setAttribute("src", iconSrc);
  weatherIcon.setAttribute("alt", description);
  weatherIcon.setAttribute("crossorigin", "anonymous");
  weatherIcon.setAttribute("referrerpolicy", "no-referrer");

  cardImage.appendChild(weatherIcon);

  cardBody.appendChild(currentTemp);
  cardBody.appendChild(weatherDescr);
  cardBody.appendChild(highTemp);
  cardBody.appendChild(lowTemp);
  cardBody.appendChild(humidity);
  cardBody.appendChild(sunrise);
  cardBody.appendChild(sunset);

  cardContent.appendChild(cardImage);
  cardContent.appendChild(cardBody);

  card.appendChild(cardHeader);
  card.appendChild(cardContent);

  cardsInfo.appendChild(card);
};

const getNextThreeForecasts = (weatherData) => {
  // Filter to get one forecast per day (every 5th item to get daily forecasts)
  const dailyForecasts = weatherData.list.filter((_, index) => index % 8 === 0).slice(0, 3);
  
  return dailyForecasts.map((forecast, index) => {
    const date = new Date(forecast.dt * 1000);
    const dayLabel = index === 0 ? "Today" : date.toLocaleDateString('en-US', { weekday: 'long' });
    
    return {
      dateTime: dayLabel,
      temperature: forecast.main.temp,
      feelsLike: forecast.main.feels_like,
      weather: forecast.weather[0].description,
      icon: forecast.weather[0].icon,
      humidity: forecast.main.humidity,
      windSpeed: forecast.wind.speed
    };
  });
}

const displayWeaterForecast = (data) => {
  const cardsInfo = document.querySelector("#cardsInfo");

  const card = document.createElement("div");
  const cardHeader = document.createElement("h2");
  const cardBody = document.createElement("div");
  const cardContent = document.createElement("div");
  const today = document.createElement("p");
  const tomorrow = document.createElement("p");
  const afterTomorrow = document.createElement("p");

  const forecast = getNextThreeForecasts(data);

  today.innerHTML = `${forecast[0].dateTime}: <span class="bold">${Math.round(forecast[0].temperature)}&deg;F</span>`;
  tomorrow.innerHTML = `${forecast[1].dateTime}: <span class="bold">${Math.round(forecast[1].temperature)}&deg;F</span>`;
  afterTomorrow.innerHTML = `${forecast[2].dateTime}: <span class="bold">${Math.round(forecast[2].temperature)}&deg;F</span>`;

  card.classList.add("weather-card");
  cardHeader.classList.add("weather-card-header");
  cardContent.classList.add("weather-card-content");
  cardBody.classList.add("weather-card-body");

  cardHeader.innerHTML = `Weather Forecast`;

  cardBody.appendChild(today);
  cardBody.appendChild(tomorrow);
  cardBody.appendChild(afterTomorrow);

  cardContent.appendChild(cardBody);

  card.appendChild(cardHeader);
  card.appendChild(cardContent);
  
  cardsInfo.appendChild(card);
};

const requestWeather = async (endpoint, callback=null) => {
  const apiKey = "643486124bff1e3d12256f8ab964512d";
  const baseUrl = "https://api.openweathermap.org/data/2.5";
  const latitude = 40.52;
  const longitude = -111.86;
  const units = "imperial";

  const weatherEndpoint = new URL(`${baseUrl}/${endpoint}`);
  const params = weatherEndpoint.searchParams;

  params.append("units", units);
  params.append("lat", latitude);
  params.append("lon", longitude);
  params.append("appid", apiKey);

  try {
    const response = await fetch(weatherEndpoint);
    if (response.ok) {
      const data = await response.json();
      if (callback) {
        callback(data);
      }
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  };
};

const fetchWeather = async () => {
  await requestWeather("weather", displayCurrentWeather);
};

const fetchForecast = async () => {
  await requestWeather("forecast", displayWeaterForecast);
};

const renderWeather = () => {
  fetchWeather();
  fetchForecast();
};

export { renderWeather };
