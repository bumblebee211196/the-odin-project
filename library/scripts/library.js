const MY_LIBRARY = [
  new Book('The Hobbit', 'J.R.R. Tolkien', 295, true)
];

function Book(title, author, pages, read=false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  MY_LIBRARY.push(book);
}

function removeBookFromLibrary(index) {
  MY_LIBRARY.splice(index, 1);
}

function updateDisplay() {
  const main = document.querySelector('.main');
  main.innerHTML = MY_LIBRARY.map((book, index) => {
    const bookRead = book.read ? 'read' : 'unread';
    const bookReadContent = book.read ? 'Read' : 'Unread';
    return `
    <div data-key="${index}" class="book-card">
        <p>Title: ${book.title}</p>
        <p>Author: ${book.author}</p>
        <p>Total Pages: ${book.pages}</p>
        <div class="button-group">
            <button class="${bookRead}-btn">${bookReadContent}</button>
            <button class="delete-btn"">Delete</button>
        </div>
    </div>
    `
  }).join('\n');
  const readBookButtons = document.querySelectorAll('.main .book-card .read-btn, .main .book-card .unread-btn');
  const deleteBookButtons = document.querySelectorAll('.main .book-card .delete-btn');
  
  readBookButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const read = e.target.innerHTML.toLowerCase();
      const bookRead = read === 'read' ? 'unread-btn' : 'read-btn';
      const bookReadContent = read === 'read' ? 'Unread' : 'Read';
      e.target.classList.remove(`${read}-btn`);
      e.target.classList.add(bookRead);
      e.target.innerHTML = bookReadContent;
    })
  });

  deleteBookButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const index = e.target.parentElement.parentElement.dataset['key'];
      removeBookFromLibrary(index);
      updateDisplay();
    })
  });

  const totalBooks = document.querySelector('#total-books');
  const booksRead = document.querySelector('#books-read');
  const booksUnread = document.querySelector('#books-unread');

  let totalNumberOfBooks = MY_LIBRARY.length;
  let numberOfBooksRead = MY_LIBRARY.filter((book) => book.read).length;

  totalBooks.innerHTML = totalNumberOfBooks;
  booksRead.innerHTML = numberOfBooksRead;
  booksUnread.innerHTML = totalNumberOfBooks - numberOfBooksRead;
}

function activatePopupForm(popupForm) {
  popupForm.classList.add('active');
}

function removePopupForm(popupForm) {
  popupForm.classList.remove('active');
}

const addBookButton = document.querySelector('.add-book-btn');
const popupForm = document.querySelector('.popup');
const closeFormButton = document.querySelector('.popup .add-book-form .close-btn');
const submitFormButton = document.querySelector('.popup .add-book-form .submit-btn');

addBookButton.addEventListener('click', () => {
  activatePopupForm(popupForm);
});

closeFormButton.addEventListener('click', () => {
  removePopupForm(popupForm);
});

submitFormButton.addEventListener('click', () => {
  const title = document.querySelector('#title').value;
  if (!title) {
    alert('Title is required');
    return;
  }
  const author = document.querySelector('#author').value;
  if (!author) {
    alert('Author is required');
    return;
  }
  const pages = document.querySelector('#pages').value;
  if (pages == 0) {
    alert('The book must contain a minimum 1 page');
    return;
  }
  const read = document.querySelector('#read').checked;
  addBookToLibrary(title, author, pages, read);
  updateDisplay();
  removePopupForm(popupForm);
});

updateDisplay();
