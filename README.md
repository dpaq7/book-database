# Book Database Application

A responsive web application for managing your book collection with MongoDB, Express, and vanilla JavaScript. This application provides CRUD operations for books and includes features like reading progress tracking, yearly reading challenges, and import/export functionality.

## Features

- **Book Management**: Add, edit, view, and delete books in your collection
- **Reading Progress Tracker**: Track pages read and percentage complete for books in progress
- **Reading Challenges**: Set yearly reading goals and track your progress
- **Import/Export**: Import books from CSV/JSON files or export your collection
- **Responsive Design**: Works well on phones, tablets, and desktops

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (connection string provided)

## Installation

1. Clone this repository or download the files
2. Install dependencies for both backend and frontend:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

## Configuration

The application connects to a MongoDB Atlas database using the provided connection string. The connection string is already configured in the `backend/server.js` file.

## Running the Application

1. Start the backend server:

```bash
cd backend
npm start
```

2. In a new terminal, start the frontend development server:

```bash
cd frontend
npm start
```

3. Open your browser and navigate to the URL shown in the frontend terminal (typically http://localhost:1234)

## Initial Data Import

The application will automatically import the "Goodreads Library Export.json" file if it's present in the root directory and the database is empty. You can also import data manually using the Import/Export page in the application.

## Usage

### Managing Books

- **View Books**: Navigate to "All Books" to see your entire collection
- **Add Book**: Click the "Add Book" button and fill in the details
- **Edit Book**: Click the pencil icon on a book to edit its details
- **Delete Book**: Click the trash icon on a book to delete it

### Tracking Reading Progress

1. Navigate to "Currently Reading" to see books in progress
2. Click the bookmark icon on a book to update your reading progress
3. Enter the current page or use the slider to update the percentage complete

### Setting Reading Challenges

1. Navigate to "Reading Challenges"
2. Click "New Challenge" to set a yearly reading goal
3. Track your progress on the challenges page

### Importing/Exporting Books

1. Navigate to "Import/Export"
2. To import: Select a JSON or CSV file and click "Import"
3. To export: Click "Export as JSON" or "Export as CSV"

## Deployment

### GitHub Pages (Frontend Only)

To deploy the frontend to GitHub Pages:

1. Update the API base URL in `frontend/src/api.js` to point to your deployed backend
2. Add a `homepage` field to your `frontend/package.json`:
   ```json
   "homepage": "https://yourusername.github.io/book-database"
   ```
3. Install gh-pages package:
   ```
   cd frontend
   npm install --save-dev gh-pages
   ```
4. Add deploy scripts to `frontend/package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist",
     ...
   }
   ```
5. Build and deploy:
   ```
   npm run deploy
   ```

### Backend Deployment

For the backend, you can deploy to services like:
- Heroku
- Render
- Railway
- Vercel

Remember to update your MongoDB connection string in your production environment.

## Project Structure

- **backend/**: Express.js server and MongoDB connection
  - **server.js**: Main server file with API endpoints
- **frontend/**: Client-side code
  - **public/**: Static files
    - **index.html**: Main HTML file
  - **src/**: JavaScript and CSS files
    - **main.js**: Entry point for the application
    - **api.js**: Service for API communication
    - **book-service.js**: Book-related operations
    - **challenge-service.js**: Reading challenge operations
    - **import-export.js**: File import/export operations
    - **ui.js**: UI-related operations
    - **styles.css**: Custom styles

## License

This project is licensed under the MIT License.
