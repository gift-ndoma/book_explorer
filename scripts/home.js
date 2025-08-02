import { initializeQuotes } from './quotes.mjs';
import { initializeSearch } from './search.mjs';

document.addEventListener('DOMContentLoaded', () => {
    initializeQuotes();
    initializeSearch();
});