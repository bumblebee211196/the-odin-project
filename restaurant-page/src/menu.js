import chickenShawarmaImage from './images/chicken-shawarma.jpg';
import veganShawarmaImage from './images/vegan-shawarma.jpg';
import mushroomShawarmaImage from './images/mushroom-shawarma.jpg';
import cauliflowerShawarmaImage from './images/cauliflower-shawarma.jpg';
import lambShawarmaImage from './images/lamb-shawarma.jpg';
import beefShawarmaImage from './images/beef-shawarma.jpg';
import './style.css';

const MENU_ITEMS = [
  {
    name: 'Chicken Shawarma',
    image: chickenShawarmaImage
  },
  {
    name: 'Vegan Shawarma',
    image: veganShawarmaImage
  },
  {
    name: 'Mushroom Shawarma',
    image: mushroomShawarmaImage
  },
  {
    name: 'Cauliflower Shawarma',
    image: cauliflowerShawarmaImage
  },
  {
    name: 'Lamb Shawarma',
    image: lambShawarmaImage
  },
  {
    name: 'Beef Shawarma',
    image: beefShawarmaImage
  }
]

function component() {
  // Create tab-content div
  const tabContent = document.createElement('div');
  tabContent.classList.add('menu-tab');

  // Create header div
  const header = document.createElement('div');
  header.classList.add('header')
  const title = document.createElement('h1');
  title.classList.add('title');
  title.innerHTML = 'Menu';
  header.appendChild(title);
  // Create header div
  const main = document.createElement('div');
  main.classList.add('main');
  const mainText = document.createElement('p');
  mainText.innerHTML = 'From Lamb Shawarma and Chicken Shawarma with Yogurt Sauce for the meat lovers, to vegan options such as Mushroom Shawarma and Vegan Cauliflower Shawarma, there’s definitely an option for everyone.';
  // Create menu div
  const menu = document.createElement('div');
  menu.classList.add('menu');
  MENU_ITEMS.forEach((menuItem) => {
    // Create item div
    const item = document.createElement('div');
    item.classList.add('item');
    const itemImage = new Image();
    itemImage.src = menuItem.image;
    itemImage.alt = menuItem.name;
    itemImage.style.height = '200px';
    const itemText = document.createElement('h3');
    itemText.innerHTML = menuItem.name;
    item.appendChild(itemImage);
    item.appendChild(itemText);
    // Add item div to menu div
    menu.appendChild(item)
  });
  main.appendChild(mainText);
  main.appendChild(menu);

  // Add header and menu divs to tab-content div
  tabContent.appendChild(header);
  tabContent.appendChild(main);

  return tabContent;
}

export function addComponent() {
  const tabContent = document.getElementById('tab-content');
  tabContent.textContent = '';
  tabContent.appendChild(component());
}
