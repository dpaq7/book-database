import { apiService } from './api.js';
import { uiService } from './ui.js';
import { bookService } from './book-service.js';
import { challengeService } from './challenge-service.js';
import { importExportService } from './import-export.js';

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize services
  apiService.init();
  uiService.init();
  bookService.init();
  challengeService.init();
  importExportService.init();
  
  // Load initial data
  bookService.loadBooks();
  challengeService.loadChallenges();
  
  // Set up navigation
  setupNavigation();
  
  // Set up event listeners
  setupEventListeners();
});

// Set up navigation between pages
function setupNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Remove active class from all links
      navLinks.forEach(l => l.classList.remove('active'));
      
      // Add active class to clicked link
      link.classList.add('active');
      
      // Get page to show
      const page = link.getAttribute('data-page');
      
      // Update page title
      const pageTitle = document.getElementById('page-title');
      pageTitle.textContent = link.textContent.trim();
      
      // Hide all pages
      const pages = document.querySelectorAll('.page-content');
      pages.forEach(p => p.classList.add('d-none'));
      
      // Show selected page
      const selectedPage = document.getElementById(`${page}-page`);
      if (selectedPage) {
        selectedPage.classList.remove('d-none');
      }
      
      // Load page-specific data
      if (page === 'books') {
        bookService.loadBooks();
      } else if (page === 'currently-reading') {
        bookService.loadShelf('currently-reading');
      } else if (page === 'read') {
        bookService.loadShelf('read');
      } else if (page === 'to-read') {
        bookService.loadShelf('to-read');
      } else if (page === 'favorites') {
        bookService.loadFavorites();
      } else if (page === 'challenges') {
        challengeService.loadChallenges();
      }
    });
  });
}

// Set up event listeners for various actions
function setupEventListeners() {
  // Add book button
  const addBookBtn = document.getElementById('add-book-btn');
  addBookBtn.addEventListener('click', () => {
    uiService.showBookModal();
  });
  
  // Save book button
  const saveBookBtn = document.getElementById('save-book-btn');
  saveBookBtn.addEventListener('click', () => {
    bookService.saveBook();
  });
  
  // Search button
  const searchButton = document.getElementById('search-button');
  searchButton.addEventListener('click', () => {
    const searchInput = document.getElementById('search-input');
    bookService.searchBooks(searchInput.value);
  });
  
  // Search input (on enter key)
  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      bookService.searchBooks(searchInput.value);
    }
  });
  
  // New challenge button
  const newChallengeBtn = document.getElementById('new-challenge-btn');
  newChallengeBtn.addEventListener('click', () => {
    uiService.showChallengeModal();
  });
  
  // Save challenge button
  const saveChallengeBtn = document.getElementById('save-challenge-btn');
  saveChallengeBtn.addEventListener('click', () => {
    challengeService.saveChallenge();
  });
  
  // Save reading progress button
  const saveProgressBtn = document.getElementById('save-progress-btn');
  saveProgressBtn.addEventListener('click', () => {
    bookService.saveReadingProgress();
  });
  
  // Current page input (update percent)
  const currentPageInput = document.getElementById('current-page');
  currentPageInput.addEventListener('input', () => {
    uiService.updatePercentFromPage();
  });
  
  // Percent complete slider (update page)
  const percentComplete = document.getElementById('percent-complete');
  percentComplete.addEventListener('input', () => {
    uiService.updatePageFromPercent();
  });
  
  // Import form
  const importForm = document.getElementById('import-form');
  importForm.addEventListener('submit', (e) => {
    e.preventDefault();
    importExportService.importBooks();
  });
  
  // Export buttons
  const exportJsonBtn = document.getElementById('export-json-btn');
  exportJsonBtn.addEventListener('click', () => {
    importExportService.exportBooks('json');
  });
  
  const exportCsvBtn = document.getElementById('export-csv-btn');
  exportCsvBtn.addEventListener('click', () => {
    importExportService.exportBooks('csv');
  });
}
