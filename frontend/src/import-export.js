import { apiService } from './api.js';
import { uiService } from './ui.js';
import { bookService } from './book-service.js';

// Import/Export Service for handling file operations
export const importExportService = {
  // Initialize the import/export service
  init() {
    // Nothing specific to initialize
  },
  
  // Import books from file
  async importBooks() {
    try {
      const fileInput = document.getElementById('import-file');
      
      if (!fileInput.files || fileInput.files.length === 0) {
        uiService.showToast('Please select a file to import', 'warning');
        return;
      }
      
      const file = fileInput.files[0];
      const fileType = this.getFileType(file.name);
      
      if (!fileType) {
        uiService.showToast('Unsupported file format. Please use JSON or CSV files.', 'warning');
        return;
      }
      
      // Show loading message
      uiService.showToast('Importing books, please wait...', 'info');
      
      let result;
      
      if (fileType === 'json') {
        result = await apiService.importJson(file);
      } else if (fileType === 'csv') {
        result = await apiService.importCsv(file);
      }
      
      // Show success message
      uiService.showToast(result.message, 'success');
      
      // Reset file input
      fileInput.value = '';
      
      // Reload books
      bookService.loadBooks();
    } catch (error) {
      console.error('Error importing books:', error);
      uiService.showToast('Error importing books', 'danger');
    }
  },
  
  // Export books to file
  async exportBooks(format) {
    try {
      // Show loading message
      uiService.showToast(`Preparing ${format.toUpperCase()} export...`, 'info');
      
      // Get books from API
      const books = await apiService.exportJson();
      
      if (format === 'json') {
        this.exportJson(books);
      } else if (format === 'csv') {
        this.exportCsv(books);
      }
    } catch (error) {
      console.error('Error exporting books:', error);
      uiService.showToast('Error exporting books', 'danger');
    }
  },
  
  // Export books to JSON file
  exportJson(books) {
    const jsonString = JSON.stringify(books, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    
    // Generate filename with current date
    const date = new Date().toISOString().split('T')[0];
    const filename = `book_export_${date}.json`;
    
    // Save file
    saveAs(blob, filename);
    
    // Show success message
    uiService.showToast('Books exported to JSON successfully', 'success');
  },
  
  // Export books to CSV file
  exportCsv(books) {
    // Get all possible headers from books
    const headers = this.getAllHeaders(books);
    
    // Create CSV content
    let csvContent = headers.join(',') + '\\n';
    
    books.forEach(book => {
      const row = headers.map(header => {
        const value = book[this.camelCase(header)];
        
        // Handle different value types
        if (value === null || value === undefined) {
          return '';
        } else if (typeof value === 'string') {
          // Escape quotes and wrap in quotes
          return '"' + value.replace(/"/g, '""') + '"';
        } else if (Array.isArray(value)) {
          return '"' + JSON.stringify(value).replace(/"/g, '""') + '"';
        } else {
          return value;
        }
      });
      
      csvContent += row.join(',') + '\\n';
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    
    // Generate filename with current date
    const date = new Date().toISOString().split('T')[0];
    const filename = `book_export_${date}.csv`;
    
    // Save file
    saveAs(blob, filename);
    
    // Show success message
    uiService.showToast('Books exported to CSV successfully', 'success');
  },
  
  // Get file type from filename
  getFileType(filename) {
    const extension = filename.split('.').pop().toLowerCase();
    
    if (extension === 'json') {
      return 'json';
    } else if (extension === 'csv') {
      return 'csv';
    }
    
    return null;
  },
  
  // Get all headers from books
  getAllHeaders(books) {
    const headers = new Set();
    
    // Original headers from the Goodreads export
    const originalHeaders = [
      'Book Id',
      'Title',
      'Author',
      'Author (By Last Name)',
      'Additional Authors',
      'ISBN',
      'ISBN13',
      'Rating',
      'Average Rating',
      'Publisher',
      'Binding',
      'Pages',
      'BEq',
      'Edition Published',
      'Published',
      'Date Read',
      'Date Added',
      'Bookshelves',
      'Bookshelves with positions',
      'Exclusive Shelf',
      'My Review',
      'Spoiler',
      'Private Notes',
      'Read Count',
      'Owned Copies'
    ];
    
    // Add original headers
    originalHeaders.forEach(header => headers.add(header));
    
    return Array.from(headers);
  },
  
  // Convert header to camelCase
  camelCase(header) {
    // Special case for 'Book Id'
    if (header === 'Book Id') return 'bookId';
    
    // Special case for 'Author (By Last Name)'
    if (header === 'Author (By Last Name)') return 'authorByLastName';
    
    // Special case for 'BEq'
    if (header === 'BEq') return 'beq';
    
    // Special case for 'ISBN'
    if (header === 'ISBN') return 'isbn';
    
    // Special case for 'ISBN13'
    if (header === 'ISBN13') return 'isbn13';
    
    // Special case for 'Bookshelves with positions'
    if (header === 'Bookshelves with positions') return 'bookshelvesWithPositions';
    
    // Special case for 'Exclusive Shelf'
    if (header === 'Exclusive Shelf') return 'exclusiveShelf';
    
    // Special case for 'My Review'
    if (header === 'My Review') return 'myReview';
    
    // Special case for 'Read Count'
    if (header === 'Read Count') return 'readCount';
    
    // Special case for 'Owned Copies'
    if (header === 'Owned Copies') return 'ownedCopies';
    
    // Special case for 'Edition Published'
    if (header === 'Edition Published') return 'editionPublished';
    
    // Special case for 'Date Read'
    if (header === 'Date Read') return 'dateRead';
    
    // Special case for 'Date Added'
    if (header === 'Date Added') return 'dateAdded';
    
    // Special case for 'Private Notes'
    if (header === 'Private Notes') return 'privateNotes';
    
    // Special case for 'Average Rating'
    if (header === 'Average Rating') return 'averageRating';
    
    // General case
    return header.toLowerCase().replace(/\s(.)/g, (_, char) => char.toUpperCase());
  }
};
