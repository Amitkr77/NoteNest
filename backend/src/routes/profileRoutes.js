import express from 'express';
import { createProfile, loginProfile } from '../controllers/profileController.js';

const router = express.Router();

router.post('/', createProfile); // POST /api/profiles
router.post('/login', loginProfile); // POST /api/profiles/login

export default router;
