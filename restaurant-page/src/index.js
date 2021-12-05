import {addComponent as addHomeTabContent} from "./home";
import {addComponent as addMenuTabContent} from "./menu";
import {addComponent as addContactTabContent} from "./contact";
import './style.css';

function component() {
  const content = document.createElement('div');
  content.id = 'content';

  const navbar = document.createElement('div');
  navbar.classList.add('navbar');
  const menuButton = document.createElement('button');
  menuButton.classList.add('btn', 'tablink', 'menu-tab');
  menuButton.textContent = 'Menu';
  menuButton.addEventListener('click', () => addMenuTabContent(tabContent));
  const homeButton = document.createElement('button');
  homeButton.classList.add('btn', 'tablink', 'home-tab');
  homeButton.textContent = 'Home';
  homeButton.addEventListener('click', () => addHomeTabContent(tabContent));
  const contactButton = document.createElement('button');
  contactButton.classList.add('btn', 'tablink', 'contact-tab');
  contactButton.textContent = 'Contact'
  contactButton.addEventListener('click',() => addContactTabContent(tabContent));
  navbar.appendChild(menuButton);
  navbar.appendChild(homeButton);
  navbar.appendChild(contactButton);

  const tabContent = document.createElement('div');
  tabContent.id = 'tab-content';
  addHomeTabContent(tabContent);

  const footer = document.createElement('div');
  footer.classList.add('footer');
  const footerText = document.createElement('p');
  footerText.innerHTML = '&copy; 2021 Bee\'s Shawarma';
  footer.appendChild(footerText);

  content.appendChild(navbar);
  content.appendChild(tabContent);
  content.appendChild(footer);

  return content;
}

document.body.appendChild(component());
