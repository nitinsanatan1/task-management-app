import express from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { validateRequest } from '../middleware/validation.middleware';
import { taskValidation, taskUpdateValidation } from '../validation/schemas';
import * as taskController from '../controllers/task.controller';

const router = express.Router();

// All routes are protected
router.use(authenticate);

// Task routes
router.post('/', validateRequest(taskValidation), taskController.createTask);
router.get('/', taskController.getAllTasks);
router.get('/status/:status', taskController.getTasksByStatus);
router.get('/:id', taskController.getTaskById);
router.put('/:id', validateRequest(taskUpdateValidation), taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

export default router;
