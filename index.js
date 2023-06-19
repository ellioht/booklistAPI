const express = require('express');
const app = express();
const port = 3001;
const router = require('./router.js');

// Tell the Express application to parse incoming JSON data
app.use(express.json());

// Tell the Express application to use the router we defined in router.js
app.use('/api', router);

// Start the server and listen for incoming requests on the specified port
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});