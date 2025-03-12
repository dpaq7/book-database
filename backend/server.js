const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://paquindan:AT0uoftDxFZ9odov@cluster0.anoa6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Atlas connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Book Schema
const bookSchema = new mongoose.Schema({
  bookId: Number,
  title: String,
  author: String,
  authorByLastName: String,
  additionalAuthors: String,
  isbn: String,
  isbn13: Number,
  rating: Number,
  averageRating: Number,
  publisher: String,
  binding: String,
  pages: Number,
  beq: Array,
  editionPublished: Number,
  published: Number,
  dateRead: String,
  dateAdded: String,
  bookshelves: String,
  bookshelvesWithPositions: String,
  exclusiveShelf: String,
  myReview: String,
  spoiler: String,
  privateNotes: String,
  readCount: Number,
  ownedCopies: Number,
  readingProgress: {
    currentPage: { type: Number, default: 0 },
    percentComplete: { type: Number, default: 0 },
    lastUpdated: { type: Date, default: Date.now }
  }
});

const Book = mongoose.model('Book', bookSchema, 'books');

// Reading Challenge Schema
const readingChallengeSchema = new mongoose.Schema({
  year: { type: Number, required: true },
  goal: { type: Number, required: true },
  completed: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const ReadingChallenge = mongoose.model('ReadingChallenge', readingChallengeSchema);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Routes

// Get all books
app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single book
app.get('/api/books/:id', async (req, res) => {
  try {
    const book = await Book.findOne({ bookId: req.params.id });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a book
app.post('/api/books', async (req, res) => {
  const book = new Book({
    ...req.body,
    bookId: req.body.bookId || Math.floor(Math.random() * 1000000000)
  });

  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a book
app.put('/api/books/:id', async (req, res) => {
  try {
    const book = await Book.findOneAndUpdate(
      { bookId: req.params.id },
      req.body,
      { new: true }
    );
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    res.json(book);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a book
app.delete('/api/books/:id', async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({ bookId: req.params.id });
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    res.json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update reading progress
app.put('/api/books/:id/progress', async (req, res) => {
  try {
    const { currentPage, percentComplete } = req.body;
    
    const book = await Book.findOneAndUpdate(
      { bookId: req.params.id },
      { 
        'readingProgress.currentPage': currentPage,
        'readingProgress.percentComplete': percentComplete,
        'readingProgress.lastUpdated': Date.now()
      },
      { new: true }
    );
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    res.json(book);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Import books from JSON
app.post('/api/import/json', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const filePath = path.join(__dirname, 'uploads', req.file.filename);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const books = JSON.parse(fileContent);

    // Transform keys to match our schema
    const transformedBooks = books.map(book => ({
      bookId: book['Book Id'],
      title: book['Title'],
      author: book['Author'],
      authorByLastName: book['Author (By Last Name)'],
      additionalAuthors: book['Additional Authors'],
      isbn: book['ISBN'],
      isbn13: book['ISBN13'],
      rating: book['Rating'],
      averageRating: book['Average Rating'],
      publisher: book['Publisher'],
      binding: book['Binding'],
      pages: book['Pages'],
      beq: book['BEq'],
      editionPublished: book['Edition Published'],
      published: book['Published'],
      dateRead: book['Date Read'],
      dateAdded: book['Date Added'],
      bookshelves: book['Bookshelves'],
      bookshelvesWithPositions: book['Bookshelves with positions'],
      exclusiveShelf: book['Exclusive Shelf'],
      myReview: book['My Review'],
      spoiler: book['Spoiler'],
      privateNotes: book['Private Notes'],
      readCount: book['Read Count'],
      ownedCopies: book['Owned Copies']
    }));

    // Delete all existing books
    await Book.deleteMany({});
    
    // Insert new books
    await Book.insertMany(transformedBooks);
    
    // Clean up uploaded file
    fs.unlinkSync(filePath);
    
    res.status(200).json({ message: `Successfully imported ${transformedBooks.length} books` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Import books from CSV
app.post('/api/import/csv', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const filePath = path.join(__dirname, 'uploads', req.file.filename);
    const books = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        // Transform CSV data to match our schema
        const book = {
          bookId: parseInt(data['Book Id']) || Math.floor(Math.random() * 1000000000),
          title: data['Title'],
          author: data['Author'],
          authorByLastName: data['Author (By Last Name)'],
          additionalAuthors: data['Additional Authors'],
          isbn: data['ISBN'],
          isbn13: data['ISBN13'] ? parseInt(data['ISBN13']) : null,
          rating: data['Rating'] ? parseInt(data['Rating']) : null,
          averageRating: data['Average Rating'] ? parseFloat(data['Average Rating']) : null,
          publisher: data['Publisher'],
          binding: data['Binding'],
          pages: data['Pages'] ? parseInt(data['Pages']) : null,
          beq: data['BEq'] ? JSON.parse(data['BEq']) : [],
          editionPublished: data['Edition Published'] ? parseInt(data['Edition Published']) : null,
          published: data['Published'] ? parseInt(data['Published']) : null,
          dateRead: data['Date Read'],
          dateAdded: data['Date Added'],
          bookshelves: data['Bookshelves'],
          bookshelvesWithPositions: data['Bookshelves with positions'],
          exclusiveShelf: data['Exclusive Shelf'],
          myReview: data['My Review'],
          spoiler: data['Spoiler'],
          privateNotes: data['Private Notes'],
          readCount: data['Read Count'] ? parseInt(data['Read Count']) : 0,
          ownedCopies: data['Owned Copies'] ? parseInt(data['Owned Copies']) : 0
        };
        books.push(book);
      })
      .on('end', async () => {
        // Delete all existing books
        await Book.deleteMany({});
        
        // Insert new books
        await Book.insertMany(books);
        
        // Clean up uploaded file
        fs.unlinkSync(filePath);
        
        res.status(200).json({ message: `Successfully imported ${books.length} books` });
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Export books to JSON
app.get('/api/export/json', async (req, res) => {
  try {
    const books = await Book.find({}, { _id: 0, __v: 0 });
    
    // Transform back to original format
    const transformedBooks = books.map(book => ({
      'Book Id': book.bookId,
      'Title': book.title,
      'Author': book.author,
      'Author (By Last Name)': book.authorByLastName,
      'Additional Authors': book.additionalAuthors,
      'ISBN': book.isbn,
      'ISBN13': book.isbn13,
      'Rating': book.rating,
      'Average Rating': book.averageRating,
      'Publisher': book.publisher,
      'Binding': book.binding,
      'Pages': book.pages,
      'BEq': book.beq,
      'Edition Published': book.editionPublished,
      'Published': book.published,
      'Date Read': book.dateRead,
      'Date Added': book.dateAdded,
      'Bookshelves': book.bookshelves,
      'Bookshelves with positions': book.bookshelvesWithPositions,
      'Exclusive Shelf': book.exclusiveShelf,
      'My Review': book.myReview,
      'Spoiler': book.spoiler,
      'Private Notes': book.privateNotes,
      'Read Count': book.readCount,
      'Owned Copies': book.ownedCopies
    }));
    
    res.json(transformedBooks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Reading Challenges
app.post('/api/challenges', async (req, res) => {
  try {
    const { year, goal } = req.body;
    
    // Check if challenge for this year already exists
    const existingChallenge = await ReadingChallenge.findOne({ year });
    
    if (existingChallenge) {
      return res.status(400).json({ message: 'Challenge for this year already exists' });
    }
    
    const challenge = new ReadingChallenge({ year, goal });
    const newChallenge = await challenge.save();
    
    res.status(201).json(newChallenge);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/api/challenges', async (req, res) => {
  try {
    const challenges = await ReadingChallenge.find().sort({ year: -1 });
    res.json(challenges);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put('/api/challenges/:year', async (req, res) => {
  try {
    const { goal, completed } = req.body;
    
    const challenge = await ReadingChallenge.findOneAndUpdate(
      { year: req.params.year },
      { goal, completed },
      { new: true }
    );
    
    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }
    
    res.json(challenge);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Import initial data from the JSON file
const importInitialData = async () => {
  try {
    const count = await Book.countDocuments();
    
    if (count === 0) {
      console.log('Importing initial data...');
      const filePath = path.join(__dirname, '..', 'Goodreads Library Export.json');
      
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const books = JSON.parse(fileContent);
        
        // Transform keys to match our schema
        const transformedBooks = books.map(book => ({
          bookId: book['Book Id'],
          title: book['Title'],
          author: book['Author'],
          authorByLastName: book['Author (By Last Name)'],
          additionalAuthors: book['Additional Authors'],
          isbn: book['ISBN'],
          isbn13: book['ISBN13'],
          rating: book['Rating'],
          averageRating: book['Average Rating'],
          publisher: book['Publisher'],
          binding: book['Binding'],
          pages: book['Pages'],
          beq: book['BEq'],
          editionPublished: book['Edition Published'],
          published: book['Published'],
          dateRead: book['Date Read'],
          dateAdded: book['Date Added'],
          bookshelves: book['Bookshelves'],
          bookshelvesWithPositions: book['Bookshelves with positions'],
          exclusiveShelf: book['Exclusive Shelf'],
          myReview: book['My Review'],
          spoiler: book['Spoiler'],
          privateNotes: book['Private Notes'],
          readCount: book['Read Count'],
          ownedCopies: book['Owned Copies']
        }));
        
        await Book.insertMany(transformedBooks);
        console.log(`Successfully imported ${transformedBooks.length} books`);
      } else {
        console.log('Initial data file not found');
      }
    }
  } catch (err) {
    console.error('Error importing initial data:', err);
  }
};

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  importInitialData();
});
