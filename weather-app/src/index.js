const API_KEY = 'b7998369e442f883b5724a6e7049e922';
const URI = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric`;
const MESSAGE = {
  2: 'There\'s a thunderstorm. It\'s better to stay inside and enjoy some hot beverage. ☕',
  3: 'It\'s drizzling out there. If you are planning to go outside take an umbrella!.🌂',
  5: 'It\'s raining out there. Take an umbrella else you will get drenched. 🌂',
  6: 'It\'s snowing out there. Time to build a snowman!. ☃',
  7: 'It\'s not safe to go out right now. ❌',
  8: 'It\'s clear out there. Great time for a picnic. 🏖'
};
const searchBar = document.querySelector('#search-bar');
const submitButton = document.querySelector('#search-btn');
const content = document.querySelector('.content');

const fetchWeather = async (city) => {
  try {
    const response = await fetch(`${URI}&q=${city}`, {
      method: 'GET',
      mode: 'cors'
    });
    const data = await response.json();
    let message;
    console.log(data.weather[0].icon.toString());
    if (data.weather[0].icon.toString().endsWith('n')) {
      message = 'Have a dreamy night! 😴';
    } else {
      message = MESSAGE[data.weather[0].id.toString()[0]];
    }
    return Promise.resolve({
      longitude: data.coord.lon,
      latitude: data.coord.lat,
      temp: data.main.temp,
      tempMax: data.main.temp_max,
      tempMin: data.main.temp_min,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      icon: data.weather[0].icon,
      message
    });
  } catch (error) {
    console.log(error);
  }
};

const addLoader = () => {
  content.innerHTML = '<div class="loader"></div>';
};

const handleEvent = async (e) => {
  try {
    const city = searchBar.value;
    const data = await fetchWeather(`${city}`);
    if (data === undefined) {
      content.innerHTML = `
      <div class="message">
          <p>No such city found!</p>
      </div>
      `;
      return;
    }
    content.innerHTML = `
    <img src="https://openweathermap.org/img/wn/${data.icon}@2x.png" alt="">
    <p class="temp-card">${data.temp}<sup class="normal"> &#8451;</sup></p>
    <div>
        <a class="city-name" href="https://www.google.com/maps/search/?api=1&query=${data.longitude},${data.latitude}">${city}</a>
    </div>
    <div class="info-card">
        <p>Lowest: ${data.tempMin}&#8451;</p>
        <p>Highest: ${data.tempMax}&#8451;</sup></p>
    </div>
    <div class="info-card">
        <p>Humidity: ${data.humidity}%</p>
        <p>Wind Speed: ${data.windSpeed}km/h</sup></p>
    </div>
    <div class="message">
        <p>${data.message}</p>
    </div>
    `;
  } catch (error) {
    console.log(error);
  }
};

submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  content.style.opacity = 1;
  content.style.pointerEvents = 'auto';
  addLoader();
  handleEvent(e);
});
