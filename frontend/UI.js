import BookService from './services/bookService';
const bookService = new BookService();
import { format } from 'timeago.js';
import Swal from 'sweetalert2'

class UI {

    async renderBooks() {
        const books = await bookService.getBooks();
        const listBooks = document.getElementById('listBooks');
        listBooks.innerHTML = '';
        books.forEach(book => {
            const div = document.createElement('div');
            div.className = '';
            div.innerHTML = `
                <div class="card">
                    <img class="card__image" src="${book.imagePath}" alt="image"/>
                    <h3 class="card__title">${book.title}</h3>
                    <h3 class="card__author">${book.author}</h3>
                    <p class="card__time">${format(book.create_at)}</p>
                    <button class="card__btn delete" _id="${book._id}">Delete</button>
                </div>            
            `;
            listBooks.appendChild(div);
        });
    }

    async addNewBook(book) {
        await bookService.postBook(book);
        this.clearBookForm();
        this.renderBooks();
    }

    clearBookForm() {
        document.getElementById('bookForm').reset();
    }

    renderMessage(message) {
        Swal.fire({
            icon: 'success',
            title: message,
            timer: 3000,
            toast: true,
            timerProgressBar: true,
            position: 'top-end',
            showConfirmButton: false,
        });
    }

    async deleteBook(bookId) {
        await bookService.deleteBook(bookId);
        this.renderBooks();
        this.renderMessage('Deleted Book Successfully')
    }

}

export default UI