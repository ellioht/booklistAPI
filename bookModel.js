const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  read: { type: Boolean, required: true, default: false },
});

module.exports.Book = mongoose.model("Book", bookSchema);
