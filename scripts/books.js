const myBooks = [
    {
    "title": "To Kill a Mockingbird",
    "author": "Harper Lee",
    "image": "http://books.google.com/books/content?id=LaMTiorjM9cC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    "year": 1960,
    "genre": "Southern Gothic, Bildungsroman",
    "rating": 4.8,
    "pages": 281,
    "language": "English",
    "isbn": "9780061120084"
  },
  {
    "title": "Sherlock Holmes",
    "author": "Sir Arthur Conan Doyle",
    "image": "http://books.google.com/books/content?id=Fq1uKmT02aMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    "year": 1892,
    "genre": "Detective fiction, Mystery",
    "rating": 4.6,
    "pages": 307,
    "language": "English",
    "isbn": "9780241952870"
  },
  {
    "title": "Pride and Prejudice",
    "author": "Jane Austen",
    "image": "http://books.google.com/books/content?id=s1gVAAAAYAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    "year": 1813,
    "genre": "Romance, Satire",
    "rating": 4.5,
    "pages": 432,
    "language": "English",
    "isbn": "9780141439518"
  },
  {
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "image": "http://books.google.com/books/content?id=iXn5U2IzVH0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    "year": 1925,
    "genre": "Tragedy, Historical fiction",
    "rating": 4.4,
    "pages": 180,
    "language": "English",
    "isbn": "9780743273565"
  },
  {
    "title": "Moby Dick",
    "author": "Herman Melville",
    "image": "http://books.google.com/books?id=XV8XAAAAYAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    "year": 1851,
    "genre": "Adventure, Epic",
    "rating": 4.0,
    "pages": 635,
    "language": "English",
    "isbn": "9781503280786"
  },
  {
    "title": "War and Peace",
    "author": "Leo Tolstoy",
    "image": "http://books.google.com/books/content?id=3cWhQgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    "year": 1869,
    "genre": "Historical fiction, Philosophical novel",
    "rating": 4.7,
    "pages": 1225,
    "language": "Russian",
    "isbn": "9780199232765"
  },
  {
    "title": "The Catcher in the Rye",
    "author": "J.D. Salinger",
    "image": "http://books.google.com/books/content?id=j--EMdEfmbkC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    "year": 1951,
    "genre": "Realist novel, Coming-of-age fiction",
    "rating": 4.1,
    "pages": 277,
    "language": "English",
    "isbn": "9780316769488"
  },
  {
    "title": "The Hobbit",
    "author": "J.R.R. Tolkien",
    "image": "http://books.google.com/books/content?id=ML6TpwAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    "year": 1937,
    "genre": "Fantasy, Adventure",
    "rating": 4.9,
    "pages": 310,
    "language": "English",
    "isbn": "9780547928227"
  },
  {
    "title": "Crime and Punishment",
    "author": "Fyodor Dostoevsky",
    "image": "http://books.google.com/books/content?id=nVGKDgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    "year": 1866,
    "genre": "Psychological fiction, Philosophical novel",
    "rating": 4.8,
    "pages": 671,
    "language": "Russian",
    "isbn": "9780140449136"
  }
];

// Save the books to localStorage
localStorage.setItem('books', JSON.stringify(myBooks));

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
            <div>
                <h3>${book.title}</h3>
                <p>Author: ${book.author}</p>
                <img src="${book.image}" alt="${book.title}">
            </div>
            <button class="favorite-btn" onclick="toggleFavorite('${book.isbn}', this)">
                <span class="heart">♡</span>
            </button>
        `;
        booksContainer.appendChild(bookElement);
    });
}


document.addEventListener('DOMContentLoaded', () => {
    const storedBooks = JSON.parse(localStorage.getItem('books')) || [];
    displayBooks(storedBooks);
});
