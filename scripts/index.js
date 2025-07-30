document.addEventListener('DOMContentLoaded', () => {
    fetchQuotes();
});

async function fetchQuotes() {
    const response = await fetch('https://api.allorigins.win/raw?url=https://zenquotes.io/api/quotes');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const quotes = await response.json();
    console.log('Fetched data:', quotes);
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
        quoteElement.innerHTML = `<p>"${quote.q}"</p><br><p>- <b>${quote.a}</b></p>`; // Fixed: closed bold tag
        quotesContainer.appendChild(quoteElement);
    });
}