import { url } from './search.mjs';
import { displayBooks } from './utils.mjs';

async function loadFavorite() {
    const booksContainer = document.getElementById('book-list');
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (favorites.length === 0) {
        booksContainer.innerHTML = '<p>No favorite books found.</p>';
        return;
    }

    const allBooks = [];

    for (let id of favorites) {
        try {
            const urlWithId = `${url}/${id}`;
            const response = await fetch(urlWithId);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            allBooks.push(data);  
        }
        catch (error) {
            console.error('Error fetching favorite book:', error);
        }
    }

    displayBooks(allBooks);
}

function initializeFavorites() {
    loadFavorite();
}

export { loadFavorite, initializeFavorites };