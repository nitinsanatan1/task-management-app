import express from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { validateRequest } from '../middleware/validation.middleware';
import { registerValidation, loginValidation } from '../validation/schemas';
import * as authController from '../controllers/auth.controller';

const router = express.Router();

// Public routes
router.post('/register', validateRequest(registerValidation), authController.register);
router.post('/login', validateRequest(loginValidation), authController.login);

// Protected routes
router.get('/me', authenticate, authController.getCurrentUser);

export default router;
