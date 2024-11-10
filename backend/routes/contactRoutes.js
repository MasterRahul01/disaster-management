import express from 'express';
import {
  getAllContacts,
  getContactsByArea,
  getContactsByType
} from '../controllers/contactController.js';

const router = express.Router();

router.get('/', getAllContacts);
router.get('/area', getContactsByArea);
router.get('/type', getContactsByType);

export default router;