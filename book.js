const bookList = document.getElementById('book-list');
const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');
const bookAdd = document.getElementById('book-add');

class Booklibrary {
  constructor() {
    this.books = [
      {
        title: 'Ghost',
        author: 'Sidney Sheldon',
      },
      {
        title: 'The Naked Face',
        author: 'Sidney Sheldon',
      },
    ];
  }
  // add books

  addBook(title, author) {
    this.books.push({
      title,
      author,
    });

    bookAuthor.value = '';
    bookTitle.value = '';
    this.setLocalStorage();
    this.displayBooks();
  }

  removeBook(index) {
    this.books.splice(index, 1);
    this.setLocalStorage();
    this.displayBooks();
  }

  setLocalStorage() {
    localStorage.setItem('localLibraries', JSON.stringify(this.books));
  }

  getLocalStorage() {
    if (localStorage.getItem('localLibraries')) {
      this.books = JSON.parse(localStorage.getItem('localLibraries'));
    }
    this.displayBooks();
  }

  displayBooks() {
    bookList.innerHTML = '';
    this.books.forEach((book, index) => {
      const h3 = document.createElement('div');
    h3.classList.add('book-div');
    const bookDiv = document.getElementById('book-form');
      const authorNames = document.createElement('p');
      const bookNames = document.createElement('p');
      const removeBtn = document.createElement('button');
      // const line  = document.createElement('div'); 
      bookNames.textContent = ` ${book.title} `;
      authorNames.textContent = ` ${book.author}`;
      removeBtn.textContent = 'remove';
      removeBtn.classList.add('remove');
      // line.classList.add('line');
      h3.append(authorNames, bookNames, removeBtn,);
      // h3.appendChild(line);
      removeBtn.addEventListener('click', () => {
        this.removeBook(index);
      });
      bookList.appendChild(h3);
    });
  }
}
const allLibrary = new Booklibrary();
bookAdd.addEventListener('click', (e) => {
  e.preventDefault();
  allLibrary.addBook(bookTitle.value, bookAuthor.value);
});

document.addEventListener('DOMContentLoaded', () => {
  allLibrary.getLocalStorage();
});