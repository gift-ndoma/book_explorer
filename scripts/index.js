
// fetch quotes from ZenQuotes API and display two random quotes
// using All Origins to bypass CORS issues
document.addEventListener('DOMContentLoaded', () => {
    fetchQuotes();
});

async function fetchQuotes() {
    const response = await fetch('https://api.allorigins.win/raw?url=https://zenquotes.io/api/quotes');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const quotes = await response.json();
    displayTwoQuotes(quotes);
}

async function displayTwoQuotes(quotes) {
    try {
        if (quotes.length < 2) {
            throw new Error('Not enough quotes available');
        }
        const randomIndices = [];
        while (randomIndices.length < 2) {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            if (!randomIndices.includes(randomIndex)) {
                randomIndices.push(randomIndex);
            }
        }
        const selectedQuotes = randomIndices.map(index => quotes[index]);
        displayQuotes(selectedQuotes);
    } catch (error) {
        console.error('Error displaying quotes:', error);
        const quotesContainer = document.getElementById('quotes-section');
        quotesContainer.innerHTML = `<p>Error loading quotes. Please try again later.</p>`;
    }
}

function displayQuotes(quotes) {
    const quotesContainer = document.getElementById('quotes-section');
    quotesContainer.innerHTML = ''; // Clear previous quotes
    
    if (!quotesContainer) { 
        console.error('Quotes container not found');
        return;
    }
    
    quotes.forEach(quote => {
        const quoteElement = document.createElement('div');
        quoteElement.className = 'quote-container';
        quoteElement.innerHTML = `<p>"${quote.q}"</p><br><p>- <b>${quote.a}</b></p>`; 
        quotesContainer.appendChild(quoteElement);
    });
};


// Fetch and display books from Google Books API

const url = `https://www.googleapis.com/books/v1/volumes`
const serchButton = document.getElementById('search-button');

// Load saved search results when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadSavedSearchResults();
});

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

function displayBooks(books) {
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


if (serchButton) {
    serchButton.addEventListener('click', getBooks);
};
// End of fetch and display books from Google Books API


// Add to favorite
function toggleFavorite(bookId, buttonElement) {
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

function addFavorite(bookId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.includes(bookId)) {
        favorites.push(bookId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
}

function removeFavorite(bookId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(id => id !== bookId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function isFavorite(bookId) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    return favorites.includes(bookId);
}

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

window.addEventListener('load', loadFavorite);




























