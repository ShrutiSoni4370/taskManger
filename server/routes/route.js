import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from '../controllers/controller.js';

import express from 'express';
const router = express.Router();


const unusedVar = 42; // This will trigger ESLint "no-unused-vars"
console.log("CI test");

router.post('/tasks', createTask);
router.get('/tasks', getAllTasks);
router.get('/tasks/:id', getTaskById);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

export default router;
