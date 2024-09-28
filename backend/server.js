import express from "express";
import db from "./src/database/database.js";
import cors from 'cors';
import profileRoutes from './src/routes/profileRoutes.js';
import workItemRoutes from './src/routes/workItemRoutes.js';
import path from "path";
import { fileURLToPath } from 'url';

// Initialize the Express application
const app = express();
const PORT = 8001;

// Get the directory name for the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware configuration
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Route configuration
app.use('/api/profiles', profileRoutes);
app.use('/api/workitems', workItemRoutes);

// Catch-all handler for React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// Database connection
db();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
