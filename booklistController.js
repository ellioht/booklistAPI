const createError = require('http-errors');

// sample books
let books = [
    { id: 1, title: 'The Lord of the Rings', author: 'J.R.R. Tolkien', read: true },
    { id: 2, title: 'Harry Potter and the Philosopher\'s Stone', author: 'J.K. Rowling', read: false },
    { id: 3, title: 'The Hobbit', author: 'J.R.R. Tolkien', read: true },
    { id: 4, title: 'And Then There Were None', author: 'Agatha Christie', read: false },
];

// GET /api/books
exports.getBooks = (req, res) => {
    res.status(200).json(books);
}

// GET /api/books/:id
exports.getBookById = (req, res, next) => {
    const id = parseInt(req.params.id);
    const book = books.find(book => book.id === id);
    if (book) {
        res.status(200).json(book);
    } else {
        next(createError(404));
    }
}

// POST /api/books
exports.addBook = (req, res) => {
    const book = req.body;
    book.id = books.length + 1;
    books.push(book);
    res.status(201).json(book);
}

// PUT /api/books/:id
exports.updateBook = (req, res, next) => {
    const id = parseInt(req.params.id);
    const book = books.find(book => book.id === id);
    if (book) {
        book.title = req.body.title;
        book.author = req.body.author;
        book.read = req.body.read;
        res.status(200).json(book);
    } else {
        next(createError(404));
    }
}

// DELETE /api/books/:id
exports.deleteBook = (req, res, next) => {
    const id = parseInt(req.params.id);
    const book = books.find(book => book.id === id);
    if (book) {
        books = books.filter(book => book.id !== id);
        res.status(200).json(book);
    } else {
        next(createError(404));
    }
}
