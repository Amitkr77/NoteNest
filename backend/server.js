import express from "express";
import db from "./src/database/database.js";
import cors from 'cors';
import profileRoutes from './src/routes/profileRoutes.js';
import workItemRoutes from './src/routes/workItemRoutes.js';
import path from "path";

// Initialize the Express application
const app = express();
const PORT = 8001;

// Middleware configuration
app.use(cors());
app.use(express.json());

// Route configuration
app.use('/api/profiles', profileRoutes);
app.use('/api/workitems', workItemRoutes);


// Database connection
db();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
