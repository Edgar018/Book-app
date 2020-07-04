import './styles/style.css';

import UI from './UI';

document.addEventListener('DOMContentLoaded', () => {
    const ui = new UI();
    ui.renderBooks();
});

document.getElementById('bookForm')
    .addEventListener('submit', e => {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const isbn = document.getElementById('isbn').value;
        const image = document.getElementById('image').files;

        const formData = new FormData();

        formData.append('title', title);
        formData.append('author', author);
        formData.append('isbn', isbn);
        formData.append('image', image[0]);

        const ui = new UI();
        ui.addNewBook(formData);
        ui.renderMessage('Save Book Successfully');

    });

document.getElementById('listBooks')
    .addEventListener('click', e => {
        if(e.target.classList.contains('delete')){
            const ui = new UI();
            ui.deleteBook(e.target.getAttribute('_id'));
        }
    })