import express from 'express';
import {
  reportIncident,
  getActiveIncidents,
  updateIncidentStatus,
  getIncidentsByArea
} from '../controllers/incidentController.js';

const router = express.Router();

router.post('/', reportIncident);
router.get('/active', getActiveIncidents);
router.get('/area', getIncidentsByArea);
router.patch('/:id/status', updateIncidentStatus);

export default router;