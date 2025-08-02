import { displayBooks } from './utils.mjs';

const url = `https://www.googleapis.com/books/v1/volumes`

function initializeSearch() {
    const searchButton = document.getElementById('search-button');
    if (searchButton) {
        searchButton.addEventListener('click', getBooks);
    }
}

function getBooks() {
    const searchQuery = document.getElementById('search-input').value;
    const urlWithQuery = `${url}?q=${encodeURIComponent(searchQuery)}`;

    fetch(urlWithQuery)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            displayBooks(data.items);
        })
        .catch(error => {
            console.error('Error fetching books:', error);
            const booksContainer = document.getElementById('book-list');
            booksContainer.innerHTML = `<p>Error loading books. Please try again later.</p>`;
        });
}

export { getBooks, url, initializeSearch };