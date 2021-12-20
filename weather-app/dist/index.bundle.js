/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
const API_KEY = 'b7998369e442f883b5724a6e7049e922';
const URI = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric`;
const MESSAGE = {
  2: 'There\'s a thunderstorm. It\'s better to stay inside and enjoy some hot beverage.',
  3: 'It\'s drizzling out there. If you are planning take an umbrella.',
  5: 'It\'s raining out there. Take an umbrella else you will get drenched.',
  6: 'It\'s snowing out there. Go out and enjoy and don\'t forget to wear some woolen.',
  7: 'It\'s not safe to go out right now.',
  8: 'It\'s clear out there. Great for a picnic.'
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
      message = 'Have a dreamy night!';
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
    console.log(city);
    const data = await fetchWeather(`${city}`);
    console.log(data);
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
  addLoader();
  handleEvent(e);
});

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQSxxRUFBcUUsUUFBUTtBQUM3RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQ0FBb0MsSUFBSSxLQUFLLEtBQUs7QUFDbEQ7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxLQUFLO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtELFVBQVU7QUFDNUQsMkJBQTJCLFVBQVUsNEJBQTRCO0FBQ2pFO0FBQ0EscUZBQXFGLGVBQWUsR0FBRyxjQUFjLElBQUksS0FBSztBQUM5SDtBQUNBO0FBQ0Esc0JBQXNCLGFBQWEsT0FBTztBQUMxQyx1QkFBdUIsYUFBYSxPQUFPO0FBQzNDO0FBQ0E7QUFDQSx3QkFBd0IsY0FBYztBQUN0Qyx3QkFBd0IsY0FBYztBQUN0QztBQUNBO0FBQ0EsYUFBYSxhQUFhO0FBQzFCO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IEFQSV9LRVkgPSAnYjc5OTgzNjllNDQyZjg4M2I1NzI0YTZlNzA0OWU5MjInO1xuY29uc3QgVVJJID0gYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP2FwcGlkPSR7QVBJX0tFWX0mdW5pdHM9bWV0cmljYDtcbmNvbnN0IE1FU1NBR0UgPSB7XG4gIDI6ICdUaGVyZVxcJ3MgYSB0aHVuZGVyc3Rvcm0uIEl0XFwncyBiZXR0ZXIgdG8gc3RheSBpbnNpZGUgYW5kIGVuam95IHNvbWUgaG90IGJldmVyYWdlLicsXG4gIDM6ICdJdFxcJ3MgZHJpenpsaW5nIG91dCB0aGVyZS4gSWYgeW91IGFyZSBwbGFubmluZyB0YWtlIGFuIHVtYnJlbGxhLicsXG4gIDU6ICdJdFxcJ3MgcmFpbmluZyBvdXQgdGhlcmUuIFRha2UgYW4gdW1icmVsbGEgZWxzZSB5b3Ugd2lsbCBnZXQgZHJlbmNoZWQuJyxcbiAgNjogJ0l0XFwncyBzbm93aW5nIG91dCB0aGVyZS4gR28gb3V0IGFuZCBlbmpveSBhbmQgZG9uXFwndCBmb3JnZXQgdG8gd2VhciBzb21lIHdvb2xlbi4nLFxuICA3OiAnSXRcXCdzIG5vdCBzYWZlIHRvIGdvIG91dCByaWdodCBub3cuJyxcbiAgODogJ0l0XFwncyBjbGVhciBvdXQgdGhlcmUuIEdyZWF0IGZvciBhIHBpY25pYy4nXG59O1xuY29uc3Qgc2VhcmNoQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlYXJjaC1iYXInKTtcbmNvbnN0IHN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2gtYnRuJyk7XG5jb25zdCBjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQnKTtcblxuY29uc3QgZmV0Y2hXZWF0aGVyID0gYXN5bmMgKGNpdHkpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke1VSSX0mcT0ke2NpdHl9YCwge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIG1vZGU6ICdjb3JzJ1xuICAgIH0pO1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgbGV0IG1lc3NhZ2U7XG4gICAgY29uc29sZS5sb2coZGF0YS53ZWF0aGVyWzBdLmljb24udG9TdHJpbmcoKSk7XG4gICAgaWYgKGRhdGEud2VhdGhlclswXS5pY29uLnRvU3RyaW5nKCkuZW5kc1dpdGgoJ24nKSkge1xuICAgICAgbWVzc2FnZSA9ICdIYXZlIGEgZHJlYW15IG5pZ2h0ISc7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1lc3NhZ2UgPSBNRVNTQUdFW2RhdGEud2VhdGhlclswXS5pZC50b1N0cmluZygpWzBdXTtcbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7XG4gICAgICBsb25naXR1ZGU6IGRhdGEuY29vcmQubG9uLFxuICAgICAgbGF0aXR1ZGU6IGRhdGEuY29vcmQubGF0LFxuICAgICAgdGVtcDogZGF0YS5tYWluLnRlbXAsXG4gICAgICB0ZW1wTWF4OiBkYXRhLm1haW4udGVtcF9tYXgsXG4gICAgICB0ZW1wTWluOiBkYXRhLm1haW4udGVtcF9taW4sXG4gICAgICBodW1pZGl0eTogZGF0YS5tYWluLmh1bWlkaXR5LFxuICAgICAgcHJlc3N1cmU6IGRhdGEubWFpbi5wcmVzc3VyZSxcbiAgICAgIGljb246IGRhdGEud2VhdGhlclswXS5pY29uLFxuICAgICAgbWVzc2FnZVxuICAgIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgfVxufTtcblxuY29uc3QgYWRkTG9hZGVyID0gKCkgPT4ge1xuICBjb250ZW50LmlubmVySFRNTCA9ICc8ZGl2IGNsYXNzPVwibG9hZGVyXCI+PC9kaXY+Jztcbn07XG5cbmNvbnN0IGhhbmRsZUV2ZW50ID0gYXN5bmMgKGUpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBjaXR5ID0gc2VhcmNoQmFyLnZhbHVlO1xuICAgIGNvbnNvbGUubG9nKGNpdHkpO1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBmZXRjaFdlYXRoZXIoYCR7Y2l0eX1gKTtcbiAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICBpZiAoZGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb250ZW50LmlubmVySFRNTCA9IGBcbiAgICAgIDxkaXYgY2xhc3M9XCJtZXNzYWdlXCI+XG4gICAgICAgICAgPHA+Tm8gc3VjaCBjaXR5IGZvdW5kITwvcD5cbiAgICAgIDwvZGl2PlxuICAgICAgYDtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29udGVudC5pbm5lckhUTUwgPSBgXG4gICAgPGltZyBzcmM9XCJodHRwczovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vJHtkYXRhLmljb259QDJ4LnBuZ1wiIGFsdD1cIlwiPlxuICAgIDxwIGNsYXNzPVwidGVtcC1jYXJkXCI+JHtkYXRhLnRlbXB9PHN1cCBjbGFzcz1cIm5vcm1hbFwiPiAmIzg0NTE7PC9zdXA+PC9wPlxuICAgIDxkaXY+XG4gICAgICAgIDxhIGNsYXNzPVwiY2l0eS1uYW1lXCIgaHJlZj1cImh0dHBzOi8vd3d3Lmdvb2dsZS5jb20vbWFwcy9zZWFyY2gvP2FwaT0xJnF1ZXJ5PSR7ZGF0YS5sb25naXR1ZGV9LCR7ZGF0YS5sYXRpdHVkZX1cIj4ke2NpdHl9PC9hPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJpbmZvLWNhcmRcIj5cbiAgICAgICAgPHA+TG93ZXN0IC0gJHtkYXRhLnRlbXBNaW59JiM4NDUxOzwvcD5cbiAgICAgICAgPHA+SGlnaGVzdCAtICR7ZGF0YS50ZW1wTWF4fSYjODQ1MTs8L3N1cD48L3A+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImluZm8tY2FyZFwiPlxuICAgICAgICA8cD5IdW1pZGl0eSAtICR7ZGF0YS5odW1pZGl0eX08L3A+XG4gICAgICAgIDxwPlByZXNzdXJlIC0gJHtkYXRhLnByZXNzdXJlfTwvc3VwPjwvcD5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwibWVzc2FnZVwiPlxuICAgICAgICA8cD4ke2RhdGEubWVzc2FnZX08L3A+XG4gICAgPC9kaXY+XG4gICAgYDtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gIH1cbn07XG5cbnN1Ym1pdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgYWRkTG9hZGVyKCk7XG4gIGhhbmRsZUV2ZW50KGUpO1xufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=