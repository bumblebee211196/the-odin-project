const addBookButton = document.querySelector('.add-book-btn');
const popupFormElement = document.querySelector('.popup');
const submitForm = document.querySelector('.popup');
const closeFormButton = document.querySelector('.popup .add-book-form .close-btn');

const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const pagesInput = document.getElementById('pages');

const titleErrorMessage = document.querySelector('#title + .error-message');
const authorErrorMessage = document.querySelector('#author + .error-message');
const pagesErrorMessage = document.querySelector('#pages + .error-message');

const removeError = (errorSelector) => {
  errorSelector.textContent = ''
  errorSelector.classList = 'error-message'
}

const showTitleError = () => {
  if (titleInput.validity.valueMissing) {
    titleErrorMessage.textContent = 'Please a enter a valid title.'
    titleErrorMessage.classList = 'error-message active';
  } else if (titleInput.validity.tooShort) {
    titleErrorMessage.textContent = `Title should be at least ${ titleInput.minLength } characters.`;
    titleErrorMessage.classList = 'error-message active';
  } else if(titleInput.validity.typeMismatch) {
    titleErrorMessage.textContent = 'Title needs to be a text.'
    titleErrorMessage.classList = 'error-message active';
  } 
}

const showAuthorError = () => {
  if (authorInput.validity.valueMissing) {
    authorErrorMessage.textContent = 'Please a enter a valid author name.'
    authorErrorMessage.classList = 'error-message active';
  } else if (authorInput.validity.tooShort) {
    authorErrorMessage.textContent = `Author should be at least ${ authorInput.minLength } characters.`;
    authorErrorMessage.classList = 'error-message active';
  } else if(authorInput.validity.typeMismatch) {
    authorErrorMessage.textContent = 'Author needs to be a text.'
    authorErrorMessage.classList = 'error-message active';
  }
}

const showPagesError = () => {
  if (pagesInput.validity.rangeUnderflow) {
    pagesErrorMessage.textContent = `The book should have atleast ${ pagesInput.min } number of pages.`
    pagesErrorMessage.classList = 'error-message active';
  } else if (pages.validity.typeMismatch) {
    pagesErrorMessage.textContent = 'Pages needs to be a number.'
    pagesErrorMessage.classList = 'error-message active';
  }
}

class Book {
  constructor(title, author, pages, read=false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

const MY_LIBRARY = class {
  static #books = [
    new Book('The Hobbit', 'J.R.R. Tolkien', 295, true)
  ];

  static addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    MY_LIBRARY.#books.push(book);
  }

  static removeBookFromLibrary(index) {
    MY_LIBRARY.#books.splice(index, 1);
  }

  static getBooks() {
    return MY_LIBRARY.#books;
  }
}

const UI_CONTROLLER = class {
  static updateSummary() {
    const totalBooks = document.querySelector('#total-books');
    const booksRead = document.querySelector('#books-read');
    const booksUnread = document.querySelector('#books-unread');

    let totalNumberOfBooks = MY_LIBRARY.getBooks().length;
    let numberOfBooksRead = MY_LIBRARY.getBooks().filter((book) => book.read).length;

    totalBooks.innerHTML = totalNumberOfBooks;
    booksRead.innerHTML = numberOfBooksRead;
    booksUnread.innerHTML = totalNumberOfBooks - numberOfBooksRead;
  }

  static #addBook() {
    const main = document.querySelector('.main');
    main.innerHTML = MY_LIBRARY.getBooks().map((book, index) => {
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
  }

  static #addButtonControls() {
    const readBookButtons = document.querySelectorAll('.main .book-card .read-btn, .main .book-card .unread-btn');
    const deleteBookButtons = document.querySelectorAll('.main .book-card .delete-btn');
    
    readBookButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        const index = e.target.parentElement.parentElement.dataset['key'];
        const book = MY_LIBRARY.getBooks()[index];
        const prevBookRead = book.read ? 'read-btn' : 'unread-btn';
        const bookRead = book.read ? 'unread-btn' : 'read-btn';
        const bookReadContent = book.read ? 'Unread' : 'Read';
        e.target.classList.replace(prevBookRead, bookRead);
        e.target.innerHTML = bookReadContent;
        book.read = !book.read
        UI_CONTROLLER.updateSummary();
      })
    });

    deleteBookButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        const index = e.target.parentElement.parentElement.dataset['key'];
        MY_LIBRARY.removeBookFromLibrary(index);
        UI_CONTROLLER.update();
      })
    });
  }

  static updateDisplay() {
    UI_CONTROLLER.#addBook();
    UI_CONTROLLER.#addButtonControls();
  }

  static update() {
    UI_CONTROLLER.updateDisplay();
    UI_CONTROLLER.updateSummary();
  }
}

const FORM_POPUP = class {
  static activatePopupForm(popupForm) {
    popupForm.classList.add('active');
  }

  static removePopupForm(popupForm) {
    popupForm.classList.remove('active');
  }
}

addBookButton.addEventListener('click', () => {
  FORM_POPUP.activatePopupForm(popupFormElement);
});

closeFormButton.addEventListener('click', () => {
  FORM_POPUP.removePopupForm(popupFormElement);
  removeError(titleErrorMessage);
  removeError(authorErrorMessage);
  removeError(pagesErrorMessage)
});

titleInput.addEventListener('input', () => {
  if (titleInput.validity.valid) {
    removeError(titleErrorMessage);
  } else {
    showTitleError();
  } 
});

authorInput.addEventListener('input', () => {
  if (authorInput.validity.valid) {
    removeError(authorErrorMessage);
  } else {
    showAuthorError();
  }
});

pagesInput.addEventListener('input', () => {
  if (pagesInput.validity.valid) {
    removeError(pagesErrorMessage);
  } else {
    showPagesError();
  }
});

submitForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!titleInput.validity.valid) {
    showTitleError();
    return;
  }
  if (!authorInput.validity.valid) {
    showAuthorError();
    return;
  }
  if (!pagesInput.validity.valid) {
    showPagesError();
    return;
   }
  const read = document.querySelector('#read').checked;
  MY_LIBRARY.addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, read);
  UI_CONTROLLER.update();
  FORM_POPUP.removePopupForm(popupFormElement);
});

UI_CONTROLLER.update();
