import EmergencyContact from '../models/EmergencyContact.js';
import { catchAsync } from '../utils/catchAsync.js';

export const getAllContacts = catchAsync(async (req, res) => {
  const contacts = await EmergencyContact.find();
  res.status(200).json(contacts);
});

export const getContactsByArea = catchAsync(async (req, res) => {
  const { area } = req.query;
  const contacts = await EmergencyContact.find({ area });
  res.status(200).json(contacts);
});

export const getContactsByType = catchAsync(async (req, res) => {
  const { type } = req.query;
  const contacts = await EmergencyContact.find({ type });
  res.status(200).json(contacts);
});