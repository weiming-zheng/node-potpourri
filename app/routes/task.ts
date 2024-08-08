import express from 'express';
const router = express.Router();

import {
   getAllTasks,
   creatTask,
   getTask,
   updateTask,
   deleteTask 
} from '../controllers/task.js';

router.route('/').get(getAllTasks).post(creatTask);
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask);

export default router;