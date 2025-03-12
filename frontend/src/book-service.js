import { apiService } from './api.js';
import { uiService } from './ui.js';

// Book Service for handling book-related operations
export const bookService = {
  books: [],
  filteredBooks: [],
  currentPage: 1,
  itemsPerPage: 10,
  totalPages: 1,
  currentFilter: 'all',
  activeFilters: {
    author: '',
    genre: '',
    rating: '',
    readStatus: ''
  },
  
  // Initialize the book service
  init() {
    // Set up event delegation for book actions
    document.addEventListener('click', (e) => {
      // Edit book button
      if (e.target.closest('.edit-book-btn')) {
        const bookId = e.target.closest('.edit-book-btn').getAttribute('data-id');
        this.editBook(bookId);
      }
      
      // Delete book button
      if (e.target.closest('.delete-book-btn')) {
        const bookId = e.target.closest('.delete-book-btn').getAttribute('data-id');
        this.confirmDeleteBook(bookId);
      }
      
      // Update progress button
      if (e.target.closest('.progress-book-btn')) {
        const bookId = e.target.closest('.progress-book-btn').getAttribute('data-id');
        this.showProgressModal(bookId);
      }
    });
    
    // Set up event listeners for filter buttons
    const applyFiltersBtn = document.getElementById('apply-filters-btn');
    if (applyFiltersBtn) {
      applyFiltersBtn.addEventListener('click', () => {
        this.applyFilters();
      });
    }
    
    const clearFiltersBtn = document.getElementById('clear-filters-btn');
    if (clearFiltersBtn) {
      clearFiltersBtn.addEventListener('click', () => {
        this.clearFilters();
      });
    }
    
    // Load initial data
    this.loadBooks();
  },
  
  // Load all books
  async loadBooks(page = 1) {
    try {
      this.currentPage = page;
      this.currentFilter = null;
      
      // Get books from API
      const books = await apiService.getBooks();
      this.books = books;
      this.filteredBooks = books;
      this.currentFilter = 'all';
      this.currentPage = page;
      
      // Calculate total pages
      this.totalPages = Math.ceil(books.length / this.itemsPerPage);
      
      // Render books table
      this.renderBooksTable(books);
      
      // Create pagination
      uiService.createPagination(page, this.totalPages, (page) => {
        this.currentPage = page;
        this.renderBooksTable(books);
      });
      
      // Populate filter dropdowns
      this.populateFilterOptions(books);
      
      // Reset page title
      const pageTitle = document.getElementById('page-title');
      pageTitle.textContent = 'All Books';
    } catch (error) {
      console.error('Error loading books:', error);
      uiService.showToast('Error loading books', 'danger');
    }
  },
  
  // Load books by shelf
  async loadShelf(shelf) {
    try {
      // Get all books from API
      const books = await apiService.getBooks();
      
      // Filter books by shelf
      const filteredBooks = books.filter(book => book.exclusiveShelf === shelf);
      
      // Store filtered books
      this.books = books;
      this.filteredBooks = filteredBooks;
      this.currentFilter = shelf;
      
      // Render books in card view
      this.renderBookCards(filteredBooks, shelf);
    } catch (error) {
      console.error(`Error loading ${shelf} books:`, error);
      uiService.showToast(`Error loading ${shelf} books`, 'danger');
    }
  },
  
  // Load favorite books
  async loadFavorites() {
    try {
      // Get all books from API
      const books = await apiService.getBooks();
      
      // Filter books that have "favorites" in bookshelves
      const filteredBooks = books.filter(book => 
        book.bookshelves && book.bookshelves.toLowerCase().includes('favorites')
      );
      
      // Store filtered books
      this.books = books;
      this.filteredBooks = filteredBooks;
      this.currentFilter = 'favorites';
      
      // Render books in card view
      this.renderBookCards(filteredBooks, 'favorites');
    } catch (error) {
      console.error('Error loading favorite books:', error);
      uiService.showToast('Error loading favorite books', 'danger');
    }
  },
  
  // Search books
  async searchBooks(query) {
    if (!query.trim()) {
      this.loadBooks();
      return;
    }
    
    try {
      // Get all books from API
      const books = await apiService.getBooks();
      
      // Filter books by search query
      const filteredBooks = books.filter(book => {
        const searchFields = [
          book.title || '',
          book.author || '',
          book.additionalAuthors || '',
          book.publisher || '',
          book.isbn || '',
          book.isbn13 ? book.isbn13.toString() : ''
        ];
        
        const searchText = searchFields.join(' ').toLowerCase();
        return searchText.includes(query.toLowerCase());
      });
      
      // Store filtered books
      this.books = books;
      this.filteredBooks = filteredBooks;
      this.currentFilter = 'search';
      this.currentPage = 1; // Reset to first page for search results
      
      // Calculate total pages
      this.totalPages = Math.ceil(filteredBooks.length / this.itemsPerPage);
      
      // Render books table
      this.renderBooksTable(filteredBooks);
      
      // Create pagination
      uiService.createPagination(1, this.totalPages, (page) => {
        this.currentPage = page;
        this.renderBooksTable(filteredBooks);
      });
      
      // Show search results message
      const pageTitle = document.getElementById('page-title');
      pageTitle.textContent = `Search Results: ${filteredBooks.length} books found`;
      
      // Make sure the books page is visible
      document.querySelectorAll('.page-content').forEach(page => {
        page.classList.add('d-none');
      });
      document.getElementById('books-page').classList.remove('d-none');
      
      // Log search results to console for debugging
      console.log(`Search results for "${query}":`, filteredBooks);
    } catch (error) {
      console.error('Error searching books:', error);
      uiService.showToast('Error searching books', 'danger');
    }
  },
  
  // Populate filter options
  populateFilterOptions(books) {
    // Get unique authors
    const authors = [...new Set(books.map(book => book.author).filter(Boolean))].sort();
    const authorSelect = document.getElementById('filter-author');
    
    // Clear existing options except the first one
    while (authorSelect.options.length > 1) {
      authorSelect.remove(1);
    }
    
    // Add author options
    authors.forEach(author => {
      const option = document.createElement('option');
      option.value = author;
      option.textContent = author;
      authorSelect.appendChild(option);
    });
    
    // Get unique genres/bookshelves
    const genres = [...new Set(books.map(book => book.bookshelves).filter(Boolean)
      .flatMap(shelves => shelves.split(',').map(s => s.trim())))].sort();
    const genreSelect = document.getElementById('filter-genre');
    
    // Clear existing options except the first one
    while (genreSelect.options.length > 1) {
      genreSelect.remove(1);
    }
    
    // Add genre options
    genres.forEach(genre => {
      const option = document.createElement('option');
      option.value = genre;
      option.textContent = genre;
      genreSelect.appendChild(option);
    });
  },
  
  // Apply filters
  applyFilters() {
    // Get filter values
    const author = document.getElementById('filter-author').value;
    const genre = document.getElementById('filter-genre').value;
    const rating = document.getElementById('filter-rating').value;
    const readStatus = document.getElementById('filter-read-status').value;
    
    // Store active filters
    this.activeFilters = {
      author,
      genre,
      rating,
      readStatus
    };
    
    // Filter books
    let filteredBooks = this.books;
    
    // Filter by author
    if (author) {
      filteredBooks = filteredBooks.filter(book => book.author === author);
    }
    
    // Filter by genre/bookshelf
    if (genre) {
      filteredBooks = filteredBooks.filter(book => {
        const bookshelves = book.bookshelves || '';
        return bookshelves.split(',').map(s => s.trim()).includes(genre);
      });
    }
    
    // Filter by rating
    if (rating) {
      const minRating = parseInt(rating);
      filteredBooks = filteredBooks.filter(book => {
        const bookRating = book.rating || 0;
        return bookRating >= minRating;
      });
    }
    
    // Filter by read status
    if (readStatus) {
      filteredBooks = filteredBooks.filter(book => book.exclusiveShelf === readStatus);
    }
    
    // Store filtered books
    this.filteredBooks = filteredBooks;
    this.currentFilter = 'filter';
    this.currentPage = 1; // Reset to first page for filtered results
    
    // Calculate total pages
    this.totalPages = Math.ceil(filteredBooks.length / this.itemsPerPage);
    
    // Render books table
    this.renderBooksTable(filteredBooks);
    
    // Create pagination
    uiService.createPagination(1, this.totalPages, (page) => {
      this.currentPage = page;
      this.renderBooksTable(filteredBooks);
    });
    
    // Show filter results message
    const pageTitle = document.getElementById('page-title');
    pageTitle.textContent = `Filtered Results: ${filteredBooks.length} books found`;
    
    // Make sure the books page is visible
    document.querySelectorAll('.page-content').forEach(page => {
      page.classList.add('d-none');
    });
    document.getElementById('books-page').classList.remove('d-none');
    
    // Hide the filter modal
    const filterModal = bootstrap.Modal.getInstance(document.getElementById('filter-modal'));
    filterModal.hide();
    
    // Show applied filters summary
    this.showFilterSummary();
  },
  
  // Clear filters
  clearFilters() {
    // Reset filter form
    document.getElementById('filter-form').reset();
    
    // Reset active filters
    this.activeFilters = {
      author: '',
      genre: '',
      rating: '',
      readStatus: ''
    };
    
    // Load all books
    this.loadBooks();
    
    // Hide the filter modal
    const filterModal = bootstrap.Modal.getInstance(document.getElementById('filter-modal'));
    filterModal.hide();
  },
  
  // Show filter summary
  showFilterSummary() {
    const { author, genre, rating, readStatus } = this.activeFilters;
    
    if (!author && !genre && !rating && !readStatus) {
      return;
    }
    
    let message = 'Filters applied: ';
    const filters = [];
    
    if (author) filters.push(`Author: ${author}`);
    if (genre) filters.push(`Genre: ${genre}`);
    if (rating) filters.push(`${rating}+ Stars`);
    if (readStatus) filters.push(`Status: ${uiService.formatShelfName(readStatus)}`);
    
    message += filters.join(', ');
    
    uiService.showToast(message, 'info');
  },
  
  // Render books table
  renderBooksTable(books) {
    const tableBody = document.getElementById('books-table-body');
    tableBody.innerHTML = '';
    
    // Calculate start and end indices for current page
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, books.length);
    
    // Get books for current page
    const booksForPage = books.slice(startIndex, endIndex);
    
    if (booksForPage.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="6" class="text-center">No books found</td>
        </tr>
      `;
      return;
    }
    
    // Create table rows
    booksForPage.forEach(book => {
      const row = document.createElement('tr');
      
      // Book title
      const titleCell = document.createElement('td');
      titleCell.innerHTML = `<span class="book-title">${book.title}</span>`;
      row.appendChild(titleCell);
      
      // Author
      const authorCell = document.createElement('td');
      authorCell.innerHTML = `<span class="book-author">${book.author}</span>`;
      row.appendChild(authorCell);
      
      // Rating
      const ratingCell = document.createElement('td');
      ratingCell.innerHTML = `<div class="book-rating">${uiService.renderStarRating(book.rating)}</div>`;
      row.appendChild(ratingCell);
      
      // Shelf
      const shelfCell = document.createElement('td');
      shelfCell.innerHTML = uiService.getShelfBadge(book.exclusiveShelf);
      row.appendChild(shelfCell);
      
      // Pages
      const pagesCell = document.createElement('td');
      pagesCell.textContent = book.pages || '-';
      row.appendChild(pagesCell);
      
      // Actions
      const actionsCell = document.createElement('td');
      actionsCell.innerHTML = `
        <div class="btn-group" role="group">
          <button type="button" class="btn btn-sm btn-outline-primary action-btn progress-book-btn" data-id="${book.bookId}" title="Update Progress">
            <i class="bi bi-bookmark"></i>
          </button>
          <button type="button" class="btn btn-sm btn-outline-secondary action-btn edit-book-btn" data-id="${book.bookId}" title="Edit">
            <i class="bi bi-pencil"></i>
          </button>
          <button type="button" class="btn btn-sm btn-outline-danger action-btn delete-book-btn" data-id="${book.bookId}" title="Delete">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      `;
      row.appendChild(actionsCell);
      
      tableBody.appendChild(row);
    });
  },
  
  // Render book cards
  renderBookCards(books, container) {
    const containerElement = document.getElementById(`${container}-books`);
    containerElement.innerHTML = '';
    
    if (books.length === 0) {
      containerElement.innerHTML = `
        <div class="col-12 text-center my-5">
          <h5>No books found</h5>
        </div>
      `;
      return;
    }
    
    books.forEach(book => {
      const card = document.createElement('div');
      card.className = 'col-md-6 col-lg-4 col-xl-3 mb-4';
      
      // Reading progress HTML
      let progressHtml = '';
      if (book.exclusiveShelf === 'currently-reading' && book.readingProgress) {
        const percent = book.readingProgress.percentComplete || 0;
        const currentPage = book.readingProgress.currentPage || 0;
        const totalPages = book.pages || 0;
        
        progressHtml = `
          <div class="progress-container">
            <div class="progress">
              <div class="progress-bar bg-success" role="progressbar" style="width: ${percent}%" 
                aria-valuenow="${percent}" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <div class="progress-info">
              <span>${currentPage} of ${totalPages} pages</span>
              <span>${percent}% complete</span>
            </div>
          </div>
        `;
      }
      
      card.innerHTML = `
        <div class="card book-card">
          <div class="card-img-top">
            <i class="bi bi-book"></i>
          </div>
          <div class="card-body">
            <h5 class="card-title">${book.title}</h5>
            <p class="card-author">${book.author}</p>
            <div class="card-rating mb-2">${uiService.renderStarRating(book.rating)}</div>
            ${uiService.getShelfBadge(book.exclusiveShelf)}
            ${progressHtml}
            <div class="mt-3">
              <button type="button" class="btn btn-sm btn-outline-primary progress-book-btn" data-id="${book.bookId}">
                <i class="bi bi-bookmark me-1"></i>Update Progress
              </button>
              <div class="btn-group mt-2" role="group">
                <button type="button" class="btn btn-sm btn-outline-secondary edit-book-btn" data-id="${book.bookId}">
                  <i class="bi bi-pencil"></i>
                </button>
                <button type="button" class="btn btn-sm btn-outline-danger delete-book-btn" data-id="${book.bookId}">
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
      
      containerElement.appendChild(card);
    });
  },
  
  // Save book (create or update)
  async saveBook() {
    try {
      // Get form data
      const bookId = document.getElementById('book-id').value;
      const title = document.getElementById('title').value;
      const author = document.getElementById('author').value;
      const additionalAuthors = document.getElementById('additional-authors').value;
      const isbn = document.getElementById('isbn').value;
      const isbn13 = document.getElementById('isbn13').value;
      const publisher = document.getElementById('publisher').value;
      const binding = document.getElementById('binding').value;
      const pages = document.getElementById('pages').value;
      const published = document.getElementById('published').value;
      const editionPublished = document.getElementById('edition-published').value;
      const exclusiveShelf = document.getElementById('exclusive-shelf').value;
      const bookshelves = document.getElementById('bookshelves').value;
      const rating = document.getElementById('rating').value;
      const myReview = document.getElementById('my-review').value;
      
      // Create book object
      const book = {
        title,
        author,
        additionalAuthors,
        isbn,
        isbn13: isbn13 ? parseInt(isbn13) : null,
        publisher,
        binding,
        pages: pages ? parseInt(pages) : null,
        published: published ? parseInt(published) : null,
        editionPublished: editionPublished ? parseInt(editionPublished) : null,
        exclusiveShelf,
        bookshelves,
        rating: rating ? parseInt(rating) : null,
        myReview,
        dateAdded: new Date().toISOString().split('T')[0].replace(/-/g, '/')
      };
      
      let result;
      
      if (bookId) {
        // Update existing book
        result = await apiService.updateBook(bookId, book);
        uiService.showToast('Book updated successfully', 'success');
      } else {
        // Create new book
        result = await apiService.createBook(book);
        uiService.showToast('Book added successfully', 'success');
      }
      
      // Hide modal
      uiService.bookModal.hide();
      
      // Reload books
      if (this.currentFilter) {
        if (this.currentFilter === 'favorites') {
          this.loadFavorites();
        } else {
          this.loadShelf(this.currentFilter);
        }
      } else {
        this.loadBooks(this.currentPage);
      }
    } catch (error) {
      console.error('Error saving book:', error);
      uiService.showToast('Error saving book', 'danger');
    }
  },
  
  // Edit book
  async editBook(bookId) {
    try {
      // Find book in current books array
      const book = this.books.find(b => b.bookId == bookId);
      
      if (book) {
        // Show book modal with book data
        uiService.showBookModal(book);
      } else {
        // Fetch book from API
        const book = await apiService.getBook(bookId);
        uiService.showBookModal(book);
      }
    } catch (error) {
      console.error('Error editing book:', error);
      uiService.showToast('Error loading book details', 'danger');
    }
  },
  
  // Confirm delete book
  confirmDeleteBook(bookId) {
    uiService.showConfirmation('Are you sure you want to delete this book?', () => {
      this.deleteBook(bookId);
    });
  },
  
  // Delete book
  async deleteBook(bookId) {
    try {
      // Delete book from API
      await apiService.deleteBook(bookId);
      
      // Show success message
      uiService.showToast('Book deleted successfully', 'success');
      
      // Reload books
      if (this.currentFilter) {
        if (this.currentFilter === 'favorites') {
          this.loadFavorites();
        } else {
          this.loadShelf(this.currentFilter);
        }
      } else {
        this.loadBooks(this.currentPage);
      }
    } catch (error) {
      console.error('Error deleting book:', error);
      uiService.showToast('Error deleting book', 'danger');
    }
  },
  
  // Show progress modal
  async showProgressModal(bookId) {
    try {
      // Find book in current books array
      let book = this.books.find(b => b.bookId == bookId);
      
      if (!book) {
        // Fetch book from API
        book = await apiService.getBook(bookId);
      }
      
      if (book) {
        // Show progress modal with book data
        uiService.showProgressModal(book);
      }
    } catch (error) {
      console.error('Error showing progress modal:', error);
      uiService.showToast('Error loading book details', 'danger');
    }
  },
  
  // Save reading progress
  async saveReadingProgress() {
    try {
      // Get form data
      const bookId = document.getElementById('progress-book-id').value;
      const currentPage = parseInt(document.getElementById('current-page').value);
      const percentComplete = parseInt(document.getElementById('percent-complete').value);
      
      // Update reading progress
      const progress = {
        currentPage,
        percentComplete
      };
      
      await apiService.updateReadingProgress(bookId, progress);
      
      // Show success message
      uiService.showToast('Reading progress updated', 'success');
      
      // Hide modal
      uiService.progressModal.hide();
      
      // Reload books
      if (this.currentFilter) {
        if (this.currentFilter === 'favorites') {
          this.loadFavorites();
        } else {
          this.loadShelf(this.currentFilter);
        }
      } else {
        this.loadBooks(this.currentPage);
      }
    } catch (error) {
      console.error('Error saving reading progress:', error);
      uiService.showToast('Error updating reading progress', 'danger');
    }
  }
};
