import './style.css';

function component() {
  // Create tab-content div
  const tabContent = document.createElement('div');
  tabContent.classList.add('contact-tab');

  // Create header div
  const header = document.createElement('div');
  header.classList.add('header');
  const title = document.createElement('h1');
  title.classList.add('title');
  title.innerHTML = 'Contact'
  header.appendChild(title);
  
  // Create main div
  const main = document.createElement('div');
  main.classList.add('main');
  
  // Create availability div
  const availability = document.createElement('div');
  availability.classList.add('availability');
  const availabilityText = document.createElement('p');
  availabilityText.innerHTML = 'We are open 7 days a week from 10AM to 10PM.';
  availability.appendChild(availabilityText);

  // Create contact div
  const contact = document.createElement('div');
  contact.classList.add('contact');
  const contactOwner = document.createElement('p');
  contactOwner.innerHTML = 'Owner - Bee';
  const contactPhone = document.createElement('p');
  contactPhone.innerHTML = 'Phone - 999-777-555';
  const contactEmail = document.createElement('p');
  contactEmail.innerHTML = 'Give us a feedback at bees.shawarma@gmail.com';
  contact.appendChild(contactOwner);
  contact.appendChild(contactPhone);
  contact.appendChild(contactEmail);
  
  // Add availability and contact divs to main div
  main.appendChild(availability);
  main.appendChild(contact);

  // Add header and main divs to tab-content div
  tabContent.appendChild(header);
  tabContent.appendChild(main);

  return tabContent;
}

export function addComponent() {
  const tabContent = document.getElementById('tab-content');
  tabContent.textContent = '';
  tabContent.appendChild(component());
}