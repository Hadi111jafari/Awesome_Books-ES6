import { DateTime } from 'luxon';
import Store from './modules/store.js';
import Book from './modules/book.js';
// UI Class: Hundle UI Tasks
class UI {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.getElementById('book-list');
    const row = document.createElement('tr');
    row.innerHTML = `
             <td>${book.title}</td>
             <td>${book.author}</td>
             <td>${book.bookId}</td>
             <td><a href="#" class="btn btn-danger btn-sm remove">Remove</a></td>
            `;
    list.appendChild(row);
  }

  static removeBook(element) {
    if (element.classList.contains('remove')) {
      element.parentElement.parentElement.remove();
    }
  }

  static clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('bookId').value = '';
  }
}

// Event: Dispaly Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);
// Event: Add a Book
document.getElementById('book-form').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault();
  //   GEt form values
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const bookId = document.getElementById('bookId').value;
  // Instantiate book
  const book = new Book(title, author, bookId);
  // Add book to UI
  UI.addBookToList(book);
  // Add book to Store
  Store.addBook(book);
  // Clear fields
  UI.clearFields();
});
// Event: Remove a Book
document.getElementById('book-list').addEventListener('click', (e) => {
  // Remove book from UI
  UI.removeBook(e.target);
  // Remove book from Store
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
});

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('date-time').innerHTML = DateTime();
});