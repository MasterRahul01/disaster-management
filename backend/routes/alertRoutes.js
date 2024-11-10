import express from 'express';
import {
  getActiveAlerts,
  createAlert,
  updateAlert,
  deleteAlert
} from '../controllers/alertController.js';

const router = express.Router();

router.get('/active', getActiveAlerts);
router.post('/', createAlert);
router.patch('/:id', updateAlert);
router.delete('/:id', deleteAlert);

export default router;