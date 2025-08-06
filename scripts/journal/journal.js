const quoteText = document.getElementById('quoteText');
const quoteAuthor = document.getElementById('quoteAuthor'); 
const quoteBook = document.getElementById('quoteBook');
const quoteTags = document.getElementById('quoteTags'); 

const quotesContainer = document.getElementById('quote_journal');

// Function to display quotes
function displayQuotes() {
    const quotes = JSON.parse(localStorage.getItem('quotes')) || [];
    quotesContainer.innerHTML = ''; // Clear previous quotes

    if (quotes.length === 0) {
        quotesContainer.innerHTML = '<p>You do not have any quote(s) added to your journal</p>';
        return;
    }

    quotes.forEach((quote, index) => {
        const quoteElement = document.createElement('div');
        quoteElement.className = 'quote-item';
        quoteElement.innerHTML = `
            <p>"${quote.text}"</p>
            <p><strong>Author:</strong> ${quote.author}</p>
            <p><strong>Book:</strong> ${quote.book}</p>
            <p><strong>Tags:</strong> ${quote.tags.join(', ')}</p>
            <button class="delete-btn" onclick="deleteQuote(${index})">Delete</button>
        `;
        quotesContainer.appendChild(quoteElement);
    });
}

// Function to add a quote
function addQuote(event) {  
    event.preventDefault();
    
    const text = quoteText.value.trim();
    const author = quoteAuthor.value.trim();
    const book = quoteBook.value.trim();
    const tags = quoteTags.value.split(',').map(tag => tag.trim()).filter(tag => tag);

    if (!text || !author || !book || tags.length === 0) {
        alert('Please fill in all fields.');
        return;
    }

    const quotes = JSON.parse(localStorage.getItem('quotes')) || [];
    quotes.push({ text, author, book, tags });
    localStorage.setItem('quotes', JSON.stringify(quotes));

    // Clear form fields
    quoteText.value = '';
    quoteAuthor.value = '';
    quoteBook.value = '';
    quoteTags.value = '';

    displayQuotes();
}

// Function to delete a quote
function deleteQuote(index) {
    const quotes = JSON.parse(localStorage.getItem('quotes')) || [];
    quotes.splice(index, 1);
    localStorage.setItem('quotes', JSON.stringify(quotes));
    displayQuotes();
}

// Event listener for form submission
document.getElementById('quoteForm').addEventListener('submit', addQuote);  

// Initial display of quotes
document.addEventListener('DOMContentLoaded', displayQuotes);