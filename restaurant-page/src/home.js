import ShawarmaImage from './images/shawarma.jpg';
import './style.css';

function component() {
  // Create tab-content div
  const tabContent = document.createElement('div')
  tabContent.classList.add('home-tab')
  
  // Create header div
  const header = document.createElement('div')
  header.classList.add('header')
  const title = document.createElement('h1')
  title.classList.add('title');
  title.innerHTML = 'Bee\'s Shawarma'
  header.appendChild(title);
  // Create main div
  const main = document.createElement('main');
  main.classList.add('main');
  const text = document.createElement('p');
  text.innerHTML = 'Best authentic shawarmas you will ever taste.';
  const image = new Image();
  image.src = ShawarmaImage;
  image.style.height = '700px';
  main.appendChild(text);
  main.appendChild(image);

  // Add header and main divs to tab-content div
  tabContent.appendChild(header);
  tabContent.appendChild(main);

  return tabContent;
}

export function addComponent(tabContent) {
  tabContent.textContent = '';
  tabContent.appendChild(component());
}
