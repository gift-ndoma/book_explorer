export function displayBooks(books) {
    const booksContainer = document.getElementById('book-list');    
    booksContainer.innerHTML = ''; // Clear previous books
    if (!books || books.length === 0) {
        booksContainer.innerHTML = '<p>No books found.</p>';
        return;
    }
    books.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.className = 'book-item';
        bookElement.innerHTML = `
            <a href="${book.volumeInfo.infoLink}" target="_blank">
                <h3>${book.volumeInfo.title}</h3>
                <p>Author: ${book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown'}</p>
                <img src="${book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/128x200'}" alt="${book.volumeInfo.title}">
            </a>
            <button class="favorite-btn" onclick="toggleFavorite('${book.id}', this)">
                <span class="heart">♡</span>
            </button>
        `;
        booksContainer.appendChild(bookElement);
    });
};

// Add to favorite
export function toggleFavorite(bookId, buttonElement) {
    const heart = buttonElement.querySelector('.heart');
    const isFavorited = heart.classList.contains('favorited');
    
    if (isFavorited) {
        // Remove from favorites
        heart.classList.remove('favorited');
        heart.innerHTML = '♡'; // Empty heart
        removeFavorite(bookId);
    } else {
        // Add to favorites
        heart.classList.add('favorited');
        heart.innerHTML = '❤'; // Filled heart
        addFavorite(bookId);
    }
};

export function addFavorite(bookId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.includes(bookId)) {
        favorites.push(bookId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
}

export function removeFavorite(bookId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(id => id !== bookId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

export function isFavorite(bookId) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    return favorites.includes(bookId);
}

// Make toggleFavorite available globally for onclick handlers
window.toggleFavorite = toggleFavorite;