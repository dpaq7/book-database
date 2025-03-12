// API Service for handling API requests
export const apiService = {
  // Base URL for API requests
  baseUrl: process.env.NODE_ENV === 'production' 
    ? 'https://book-database-backend.onrender.com/api' // Replace with your deployed backend URL when available
    : 'http://localhost:5001/api',
  
  // Initialize the API service
  init() {
    // Check if we're in development mode
    if (process.env.NODE_ENV !== 'production') {
      console.log('API Service initialized in development mode');
      console.log('API Base URL:', this.baseUrl);
    }
  },
  
  // Generic GET request
  async get(endpoint) {
    try {
      const response = await fetch(`${this.baseUrl}/${endpoint}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API GET Error:', error);
      throw error;
    }
  },
  
  // Generic POST request
  async post(endpoint, data) {
    try {
      const response = await fetch(`${this.baseUrl}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API POST Error:', error);
      throw error;
    }
  },
  
  // Generic PUT request
  async put(endpoint, data) {
    try {
      const response = await fetch(`${this.baseUrl}/${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API PUT Error:', error);
      throw error;
    }
  },
  
  // Generic DELETE request
  async delete(endpoint) {
    try {
      const response = await fetch(`${this.baseUrl}/${endpoint}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API DELETE Error:', error);
      throw error;
    }
  },
  
  // File upload with FormData
  async uploadFile(endpoint, file, fileType) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch(`${this.baseUrl}/${endpoint}`, {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Upload Error:', error);
      throw error;
    }
  },
  
  // Book-specific API methods
  
  // Get all books
  async getBooks() {
    return this.get('books');
  },
  
  // Get a single book
  async getBook(id) {
    return this.get(`books/${id}`);
  },
  
  // Create a new book
  async createBook(book) {
    return this.post('books', book);
  },
  
  // Update a book
  async updateBook(id, book) {
    return this.put(`books/${id}`, book);
  },
  
  // Delete a book
  async deleteBook(id) {
    return this.delete(`books/${id}`);
  },
  
  // Update reading progress
  async updateReadingProgress(id, progress) {
    return this.put(`books/${id}/progress`, progress);
  },
  
  // Reading Challenge API methods
  
  // Get all challenges
  async getChallenges() {
    return this.get('challenges');
  },
  
  // Create a new challenge
  async createChallenge(challenge) {
    return this.post('challenges', challenge);
  },
  
  // Update a challenge
  async updateChallenge(year, challenge) {
    return this.put(`challenges/${year}`, challenge);
  },
  
  // Import/Export API methods
  
  // Import books from JSON
  async importJson(file) {
    return this.uploadFile('import/json', file);
  },
  
  // Import books from CSV
  async importCsv(file) {
    return this.uploadFile('import/csv', file);
  },
  
  // Export books to JSON
  async exportJson() {
    return this.get('export/json');
  }
};
