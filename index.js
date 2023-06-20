require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const router = require("./router.js");
const mongoose = require("mongoose");

// prettier-ignore
// Connect to MongoDB Atlas using the DB_URI environment variable
try {
  mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  console.log("Connected to MongoDB Atlas");
} catch (error) {
  console.log(error);
}  

// Tell the Express application to parse incoming JSON data
app.use(express.json());

// Tell the Express application to use the router we defined in router.js
app.use("/api", router);

// Start the server and listen for incoming requests on the specified port
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
