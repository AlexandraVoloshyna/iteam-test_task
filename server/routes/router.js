
import express from 'express';
import authController from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/profile/:id', protect, authController.getProfile);
router.put('/profile/:id', protect, authController.updateProfile);

export default router;