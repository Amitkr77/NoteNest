import express from "express";
import db from "./src/database/database.js"; 
import cors from 'cors';
import profileRoutes from './src/routes/profileRoutes.js';
import workItemRoutes from './src/routes/workItemRoutes.js';

const path = require('path');
const app = express();
const port = 8001;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/build')));

// The "catchall" handler: for any request that doesn't match one above,
// send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../frontend/build/index.html'));
});


// Middleware
app.use(express.json());
app.use(cors());

// Database connection
db();

// Use routes
app.use('/api/profiles', profileRoutes); 
app.use('/api/workitems', workItemRoutes); 

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
