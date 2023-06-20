const createError = require("http-errors");
const { Book } = require("./bookModel.js");

// sample books
// let books = [
//   { id: 1, title: "The Lord of the Rings", author: "J.R.R. Tolkien", read: true },
//   { id: 2, title: "Harry Potter and the Philosopher's Stone", author: "J.K. Rowling", read: false },
//   { id: 3, title: "The Hobbit", author: "J.R.R. Tolkien", read: true },
//   { id: 4, title: "And Then There Were None", author: "Agatha Christie", read: false },
// ];

// GET /api/books
exports.getBooks = async (req, res, next) => {
  // res.status(200).json(books);
  try {
    const books = await Book.find();
    res.send(books);
  } catch (error) {
    return next(createError(500, error.message));
  }
};

// GET /api/books/:id
exports.getBookById = async (req, res, next) => {
  if (!req.params.id) {
    return next(createError(400, "Missing required fields"));
  }
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return next(createError(404, "Book not found"));
    }
    res.send(book);
  } catch (error) {
    return next(createError(500, error.message));
  }
};

// POST /api/books
exports.addBook = async (req, res, next) => {
  if (!req.body.title) {
    return (next(createError(400, "Missing required fields")));
  }
  try {
    const newBook = new Book({
      title: req.body.title,
      author: req.body.author,
      read: req.body.read,
    });
    await newBook.save();
    res.send(newBook);
  } catch (error) {
    return next(createError(500, error.message));
  }
};

// PUT /api/books/:id
exports.updateBook = async (req, res, next) => {
  if (!req.params.id) {
    return next(createError(400, "Missing required fields"));
  }
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      author: req.body.author,
      read: req.body.read,
    });

    res.send(updatedBook);
  } catch (error) {
    return next(createError(500, error.message));
  }
};

// DELETE /api/books/:id
exports.deleteBook = async (req, res, next) => {
  if (!req.params.id) {
    return next(createError(400, "Missing required fields"));
  }
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return next(createError(404, "Book not found"));
    }
    res.send(deletedBook);
  } catch (error) {
    return next(createError(500, error.message));
  }
};

// DELETE all books
exports.deleteBooks = async (req, res) => {
  // books = [];
  try {
    await Book.deleteMany();
    res.send("All books deleted");
  } catch (error) {
    return next(createError(500, error.message));
  }
};

// FILTERS

// GET by filter  /books?read=true
// exports.getBooksByFilter = (req, res) => {
//   const { title, author, read } = req.query;
//   let filteredBooks = books;

//   if (read) {
//     filteredBooks = filteredBooks.filter((book) => book.read === read);
//   }
//   if (title) {
//     filteredBooks = filteredBooks.filter((book) => book.title === title);
//   }
//   if (author) {
//     filteredBooks = filteredBooks.filter((book) => book.author === author);
//   }
//   res.status(200).json(filteredBooks);
// };
