// UI Service for handling UI-related operations
export const uiService = {
  // Bootstrap modal instances
  bookModal: null,
  progressModal: null,
  challengeModal: null,
  
  // Initialize the UI service
  init() {
    // Initialize Bootstrap modals
    this.bookModal = new bootstrap.Modal(document.getElementById('book-modal'));
    this.progressModal = new bootstrap.Modal(document.getElementById('progress-modal'));
    this.challengeModal = new bootstrap.Modal(document.getElementById('challenge-modal'));
  },
  
  // Show book modal for adding/editing a book
  showBookModal(book = null) {
    const modalTitle = document.getElementById('book-modal-label');
    const bookForm = document.getElementById('book-form');
    
    // Reset form
    bookForm.reset();
    
    if (book) {
      // Edit existing book
      modalTitle.textContent = 'Edit Book';
      
      // Fill form with book data
      document.getElementById('book-id').value = book.bookId;
      document.getElementById('title').value = book.title || '';
      document.getElementById('author').value = book.author || '';
      document.getElementById('additional-authors').value = book.additionalAuthors || '';
      document.getElementById('isbn').value = book.isbn || '';
      document.getElementById('isbn13').value = book.isbn13 || '';
      document.getElementById('publisher').value = book.publisher || '';
      document.getElementById('binding').value = book.binding || '';
      document.getElementById('pages').value = book.pages || '';
      document.getElementById('published').value = book.published || '';
      document.getElementById('edition-published').value = book.editionPublished || '';
      document.getElementById('exclusive-shelf').value = book.exclusiveShelf || 'to-read';
      document.getElementById('bookshelves').value = book.bookshelves || '';
      document.getElementById('rating').value = book.rating || '';
      document.getElementById('my-review').value = book.myReview || '';
    } else {
      // Add new book
      modalTitle.textContent = 'Add New Book';
      document.getElementById('book-id').value = '';
    }
    
    this.bookModal.show();
  },
  
  // Show reading progress modal
  showProgressModal(book) {
    const bookTitle = document.getElementById('book-title');
    const totalPages = document.getElementById('total-pages');
    const currentPage = document.getElementById('current-page');
    const percentComplete = document.getElementById('percent-complete');
    const progressBookId = document.getElementById('progress-book-id');
    
    // Reset form
    document.getElementById('progress-form').reset();
    
    // Fill form with book data
    bookTitle.value = book.title;
    totalPages.value = book.pages || 0;
    
    // Set current progress
    if (book.readingProgress) {
      currentPage.value = book.readingProgress.currentPage || 0;
      percentComplete.value = book.readingProgress.percentComplete || 0;
      document.getElementById('percent-display').textContent = `${book.readingProgress.percentComplete || 0}%`;
    } else {
      currentPage.value = 0;
      percentComplete.value = 0;
      document.getElementById('percent-display').textContent = '0%';
    }
    
    // Set max value for current page
    currentPage.max = book.pages || 100;
    
    // Set book ID
    progressBookId.value = book.bookId;
    
    this.progressModal.show();
  },
  
  // Show challenge modal
  showChallengeModal(challenge = null) {
    const modalTitle = document.getElementById('challenge-modal-label');
    const challengeForm = document.getElementById('challenge-form');
    
    // Reset form
    challengeForm.reset();
    
    if (challenge) {
      // Edit existing challenge
      modalTitle.textContent = 'Edit Reading Challenge';
      
      // Fill form with challenge data
      document.getElementById('challenge-year').value = challenge.year;
      document.getElementById('challenge-goal').value = challenge.goal;
      
      // Disable year field for existing challenges
      document.getElementById('challenge-year').disabled = true;
    } else {
      // Add new challenge
      modalTitle.textContent = 'New Reading Challenge';
      
      // Set default year to current year
      const currentYear = new Date().getFullYear();
      document.getElementById('challenge-year').value = currentYear;
      
      // Enable year field for new challenges
      document.getElementById('challenge-year').disabled = false;
    }
    
    this.challengeModal.show();
  },
  
  // Update percent complete from current page
  updatePercentFromPage() {
    const currentPage = document.getElementById('current-page');
    const totalPages = document.getElementById('total-pages');
    const percentComplete = document.getElementById('percent-complete');
    const percentDisplay = document.getElementById('percent-display');
    
    if (totalPages.value > 0) {
      const percent = Math.round((currentPage.value / totalPages.value) * 100);
      percentComplete.value = percent;
      percentDisplay.textContent = `${percent}%`;
    }
  },
  
  // Update current page from percent complete
  updatePageFromPercent() {
    const currentPage = document.getElementById('current-page');
    const totalPages = document.getElementById('total-pages');
    const percentComplete = document.getElementById('percent-complete');
    const percentDisplay = document.getElementById('percent-display');
    
    if (totalPages.value > 0) {
      const page = Math.round((percentComplete.value / 100) * totalPages.value);
      currentPage.value = page;
      percentDisplay.textContent = `${percentComplete.value}%`;
    }
  },
  
  // Show toast notification
  showToast(message, type = 'success') {
    // Create toast container if it doesn't exist
    let toastContainer = document.querySelector('.toast-container');
    
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
      document.body.appendChild(toastContainer);
    }
    
    // Create toast element
    const toastEl = document.createElement('div');
    toastEl.className = `toast align-items-center text-white bg-${type} border-0`;
    toastEl.setAttribute('role', 'alert');
    toastEl.setAttribute('aria-live', 'assertive');
    toastEl.setAttribute('aria-atomic', 'true');
    
    // Create toast content
    toastEl.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">
          ${message}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    `;
    
    // Add toast to container
    toastContainer.appendChild(toastEl);
    
    // Initialize and show toast
    const toast = new bootstrap.Toast(toastEl, { autohide: true, delay: 3000 });
    toast.show();
    
    // Remove toast after it's hidden
    toastEl.addEventListener('hidden.bs.toast', () => {
      toastEl.remove();
    });
  },
  
  // Show confirmation dialog
  showConfirmation(message, callback) {
    if (confirm(message)) {
      callback();
    }
  },
  
  // Render star rating
  renderStarRating(rating) {
    let stars = '';
    
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars += '<i class="bi bi-star-fill rating-star"></i>';
      } else {
        stars += '<i class="bi bi-star rating-star"></i>';
      }
    }
    
    return stars;
  },
  
  // Format date string (YYYY/MM/DD to MM/DD/YYYY)
  formatDate(dateString) {
    if (!dateString) return '';
    
    const parts = dateString.split('/');
    if (parts.length !== 3) return dateString;
    
    return `${parts[1]}/${parts[2]}/${parts[0]}`;
  },
  
  // Get shelf badge HTML
  getShelfBadge(shelf) {
    let badgeClass = '';
    let icon = '';
    
    switch (shelf) {
      case 'read':
        badgeClass = 'shelf-read';
        icon = 'bi-check-circle';
        break;
      case 'currently-reading':
        badgeClass = 'shelf-currently-reading';
        icon = 'bi-bookmark';
        break;
      case 'to-read':
        badgeClass = 'shelf-to-read';
        icon = 'bi-hourglass';
        break;
      default:
        badgeClass = 'bg-secondary text-white';
        icon = 'bi-book';
    }
    
    return `<span class="book-shelf ${badgeClass}"><i class="bi ${icon} me-1"></i>${this.formatShelfName(shelf)}</span>`;
  },
  
  // Format shelf name for display
  formatShelfName(shelf) {
    switch (shelf) {
      case 'read':
        return 'Read';
      case 'currently-reading':
        return 'Currently Reading';
      case 'to-read':
        return 'To Read';
      default:
        return shelf;
    }
  },
  
  // Create pagination
  createPagination(currentPage, totalPages, onPageChange) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';
    
    if (totalPages <= 1) {
      return;
    }
    
    // Previous button
    const prevLi = document.createElement('li');
    prevLi.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
    
    const prevLink = document.createElement('a');
    prevLink.className = 'page-link';
    prevLink.href = '#';
    prevLink.setAttribute('aria-label', 'Previous');
    prevLink.innerHTML = '<span aria-hidden="true">&laquo;</span>';
    
    if (currentPage > 1) {
      prevLink.addEventListener('click', (e) => {
        e.preventDefault();
        onPageChange(currentPage - 1);
      });
    }
    
    prevLi.appendChild(prevLink);
    pagination.appendChild(prevLi);
    
    // Page numbers
    const maxPages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
    let endPage = Math.min(totalPages, startPage + maxPages - 1);
    
    if (endPage - startPage + 1 < maxPages) {
      startPage = Math.max(1, endPage - maxPages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      const pageLi = document.createElement('li');
      pageLi.className = `page-item ${i === currentPage ? 'active' : ''}`;
      
      const pageLink = document.createElement('a');
      pageLink.className = 'page-link';
      pageLink.href = '#';
      pageLink.textContent = i;
      
      if (i !== currentPage) {
        pageLink.addEventListener('click', (e) => {
          e.preventDefault();
          onPageChange(i);
        });
      }
      
      pageLi.appendChild(pageLink);
      pagination.appendChild(pageLi);
    }
    
    // Next button
    const nextLi = document.createElement('li');
    nextLi.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
    
    const nextLink = document.createElement('a');
    nextLink.className = 'page-link';
    nextLink.href = '#';
    nextLink.setAttribute('aria-label', 'Next');
    nextLink.innerHTML = '<span aria-hidden="true">&raquo;</span>';
    
    if (currentPage < totalPages) {
      nextLink.addEventListener('click', (e) => {
        e.preventDefault();
        onPageChange(currentPage + 1);
      });
    }
    
    nextLi.appendChild(nextLink);
    pagination.appendChild(nextLi);
  }
};
