const express = require('express');
const router = express.Router();
const booklist = require('./booklistController.js');

// GET all books
router.get('/books', booklist.getBooks);

// GET a single book by id
router.get('/books/:id', booklist.getBookById);

// POST a new book
router.post('/books', booklist.addBook);

// PUT (update) an existing book by id
router.put('/books/:id', booklist.updateBook);

// DELETE an existing book by id
router.delete('/books/:id', booklist.deleteBook);

module.exports = router;