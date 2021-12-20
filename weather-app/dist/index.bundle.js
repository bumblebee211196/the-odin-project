/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
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
      pressure: data.main.pressure,
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
        <p>Lowest - ${data.tempMin}&#8451;</p>
        <p>Highest - ${data.tempMax}&#8451;</sup></p>
    </div>
    <div class="info-card">
        <p>Humidity - ${data.humidity}</p>
        <p>Pressure - ${data.pressure}</sup></p>
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

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQSxxRUFBcUUsUUFBUTtBQUM3RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQ0FBb0MsSUFBSSxLQUFLLEtBQUs7QUFDbEQ7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsS0FBSztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0QsVUFBVTtBQUM1RCwyQkFBMkIsVUFBVSw0QkFBNEI7QUFDakU7QUFDQSxxRkFBcUYsZUFBZSxHQUFHLGNBQWMsSUFBSSxLQUFLO0FBQzlIO0FBQ0E7QUFDQSxzQkFBc0IsYUFBYSxPQUFPO0FBQzFDLHVCQUF1QixhQUFhLE9BQU87QUFDM0M7QUFDQTtBQUNBLHdCQUF3QixjQUFjO0FBQ3RDLHdCQUF3QixjQUFjO0FBQ3RDO0FBQ0E7QUFDQSxhQUFhLGFBQWE7QUFDMUI7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IEFQSV9LRVkgPSAnYjc5OTgzNjllNDQyZjg4M2I1NzI0YTZlNzA0OWU5MjInO1xuY29uc3QgVVJJID0gYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP2FwcGlkPSR7QVBJX0tFWX0mdW5pdHM9bWV0cmljYDtcbmNvbnN0IE1FU1NBR0UgPSB7XG4gIDI6ICdUaGVyZVxcJ3MgYSB0aHVuZGVyc3Rvcm0uIEl0XFwncyBiZXR0ZXIgdG8gc3RheSBpbnNpZGUgYW5kIGVuam95IHNvbWUgaG90IGJldmVyYWdlLiDimJUnLFxuICAzOiAnSXRcXCdzIGRyaXp6bGluZyBvdXQgdGhlcmUuIElmIHlvdSBhcmUgcGxhbm5pbmcgdG8gZ28gb3V0c2lkZSB0YWtlIGFuIHVtYnJlbGxhIS7wn4yCJyxcbiAgNTogJ0l0XFwncyByYWluaW5nIG91dCB0aGVyZS4gVGFrZSBhbiB1bWJyZWxsYSBlbHNlIHlvdSB3aWxsIGdldCBkcmVuY2hlZC4g8J+MgicsXG4gIDY6ICdJdFxcJ3Mgc25vd2luZyBvdXQgdGhlcmUuIFRpbWUgdG8gYnVpbGQgYSBzbm93bWFuIS4g4piDJyxcbiAgNzogJ0l0XFwncyBub3Qgc2FmZSB0byBnbyBvdXQgcmlnaHQgbm93LiDinYwnLFxuICA4OiAnSXRcXCdzIGNsZWFyIG91dCB0aGVyZS4gR3JlYXQgdGltZSBmb3IgYSBwaWNuaWMuIPCfj5YnXG59O1xuY29uc3Qgc2VhcmNoQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlYXJjaC1iYXInKTtcbmNvbnN0IHN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2gtYnRuJyk7XG5jb25zdCBjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQnKTtcblxuY29uc3QgZmV0Y2hXZWF0aGVyID0gYXN5bmMgKGNpdHkpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke1VSSX0mcT0ke2NpdHl9YCwge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIG1vZGU6ICdjb3JzJ1xuICAgIH0pO1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgbGV0IG1lc3NhZ2U7XG4gICAgY29uc29sZS5sb2coZGF0YS53ZWF0aGVyWzBdLmljb24udG9TdHJpbmcoKSk7XG4gICAgaWYgKGRhdGEud2VhdGhlclswXS5pY29uLnRvU3RyaW5nKCkuZW5kc1dpdGgoJ24nKSkge1xuICAgICAgbWVzc2FnZSA9ICdIYXZlIGEgZHJlYW15IG5pZ2h0ISDwn5i0JztcbiAgICB9IGVsc2Uge1xuICAgICAgbWVzc2FnZSA9IE1FU1NBR0VbZGF0YS53ZWF0aGVyWzBdLmlkLnRvU3RyaW5nKClbMF1dO1xuICAgIH1cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHtcbiAgICAgIGxvbmdpdHVkZTogZGF0YS5jb29yZC5sb24sXG4gICAgICBsYXRpdHVkZTogZGF0YS5jb29yZC5sYXQsXG4gICAgICB0ZW1wOiBkYXRhLm1haW4udGVtcCxcbiAgICAgIHRlbXBNYXg6IGRhdGEubWFpbi50ZW1wX21heCxcbiAgICAgIHRlbXBNaW46IGRhdGEubWFpbi50ZW1wX21pbixcbiAgICAgIGh1bWlkaXR5OiBkYXRhLm1haW4uaHVtaWRpdHksXG4gICAgICBwcmVzc3VyZTogZGF0YS5tYWluLnByZXNzdXJlLFxuICAgICAgaWNvbjogZGF0YS53ZWF0aGVyWzBdLmljb24sXG4gICAgICBtZXNzYWdlXG4gICAgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coZXJyb3IpO1xuICB9XG59O1xuXG5jb25zdCBhZGRMb2FkZXIgPSAoKSA9PiB7XG4gIGNvbnRlbnQuaW5uZXJIVE1MID0gJzxkaXYgY2xhc3M9XCJsb2FkZXJcIj48L2Rpdj4nO1xufTtcblxuY29uc3QgaGFuZGxlRXZlbnQgPSBhc3luYyAoZSkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IGNpdHkgPSBzZWFyY2hCYXIudmFsdWU7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IGZldGNoV2VhdGhlcihgJHtjaXR5fWApO1xuICAgIGlmIChkYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnRlbnQuaW5uZXJIVE1MID0gYFxuICAgICAgPGRpdiBjbGFzcz1cIm1lc3NhZ2VcIj5cbiAgICAgICAgICA8cD5ObyBzdWNoIGNpdHkgZm91bmQhPC9wPlxuICAgICAgPC9kaXY+XG4gICAgICBgO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb250ZW50LmlubmVySFRNTCA9IGBcbiAgICA8aW1nIHNyYz1cImh0dHBzOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi8ke2RhdGEuaWNvbn1AMngucG5nXCIgYWx0PVwiXCI+XG4gICAgPHAgY2xhc3M9XCJ0ZW1wLWNhcmRcIj4ke2RhdGEudGVtcH08c3VwIGNsYXNzPVwibm9ybWFsXCI+ICYjODQ1MTs8L3N1cD48L3A+XG4gICAgPGRpdj5cbiAgICAgICAgPGEgY2xhc3M9XCJjaXR5LW5hbWVcIiBocmVmPVwiaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS9tYXBzL3NlYXJjaC8/YXBpPTEmcXVlcnk9JHtkYXRhLmxvbmdpdHVkZX0sJHtkYXRhLmxhdGl0dWRlfVwiPiR7Y2l0eX08L2E+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImluZm8tY2FyZFwiPlxuICAgICAgICA8cD5Mb3dlc3QgLSAke2RhdGEudGVtcE1pbn0mIzg0NTE7PC9wPlxuICAgICAgICA8cD5IaWdoZXN0IC0gJHtkYXRhLnRlbXBNYXh9JiM4NDUxOzwvc3VwPjwvcD5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiaW5mby1jYXJkXCI+XG4gICAgICAgIDxwPkh1bWlkaXR5IC0gJHtkYXRhLmh1bWlkaXR5fTwvcD5cbiAgICAgICAgPHA+UHJlc3N1cmUgLSAke2RhdGEucHJlc3N1cmV9PC9zdXA+PC9wPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJtZXNzYWdlXCI+XG4gICAgICAgIDxwPiR7ZGF0YS5tZXNzYWdlfTwvcD5cbiAgICA8L2Rpdj5cbiAgICBgO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgfVxufTtcblxuc3VibWl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBjb250ZW50LnN0eWxlLm9wYWNpdHkgPSAxO1xuICBjb250ZW50LnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnYXV0byc7XG4gIGFkZExvYWRlcigpO1xuICBoYW5kbGVFdmVudChlKTtcbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9