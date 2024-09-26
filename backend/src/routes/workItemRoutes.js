import express from 'express';
import { createWorkItem, getWorkItems, deleteWorkItem, updateWorkItem, deleteAllWorkItems } from '../controllers/workItemController.js';

const router = express.Router();

router.post('/', createWorkItem); // POST /api/workitems
router.get('/', getWorkItems); // GET /api/workitems
router.delete('/delete/:id', deleteWorkItem); // DELETE /api/workitems/delete/:id
router.patch('/update/:id', updateWorkItem); // PATCH /api/workitems/update/:id
router.delete('/deleteAll', deleteAllWorkItems); // DELETE /api/workitems/deleteAll

export default router;
