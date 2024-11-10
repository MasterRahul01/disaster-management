import express from 'express';
import {
  getAllResources,
  getResourcesByType,
  updateResourceStatus,
  getNearbyResources
} from '../controllers/resourceController.js';

const router = express.Router();

router.get('/', getAllResources);
router.get('/type', getResourcesByType);
router.get('/nearby', getNearbyResources);
router.patch('/:id', updateResourceStatus);

export default router;