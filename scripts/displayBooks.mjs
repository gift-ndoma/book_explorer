const url = `https://www.googleapis.com/books/v1/volumes?`

function getBooks() {
    const searchQuery = document.getElementById('search-input').value;
    const urlWithQuery = `${url}q=${encodeURIComponent(searchQuery)}`;

    fetch(urlWithQuery)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayBooks(data.items);
            console.log('Fetched books:', data.items);
        })
        .catch(error => {
            console.error('Error fetching books:', error);
            const booksContainer = document.getElementById('books-section');
            booksContainer.innerHTML = `<p>Error loading books. Please try again later.</p>`;
        });
}