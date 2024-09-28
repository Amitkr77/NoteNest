import express from "express";
import db from "./src/database/database.js";
import cors from 'cors';
import profileRoutes from './src/routes/profileRoutes.js';
import workItemRoutes from './src/routes/workItemRoutes.js';
import path from "path";
import { fileURLToPath } from 'url';

// Create an Express application
const app = express();
const port = 8001;

// Get the directory name for the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/dist')));
// Use routes
app.use('/api/profiles', profileRoutes);
app.use('/api/workitems', workItemRoutes);

// The "catchall" handler: for any request that doesn't match one above,
// send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// Database connection
db();


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
