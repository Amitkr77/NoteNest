import express from "express";
import db from "./src/database/database.js"; 
import cors from 'cors';
import profileRoutes from './src/routes/profileRoutes.js';
import workItemRoutes from './src/routes/workItemRoutes.js';

const app = express();
const port = 8001;

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
