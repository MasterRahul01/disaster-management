import Alert from '../models/Alert.js';
import { catchAsync } from '../utils/catchAsync.js';

export const getActiveAlerts = catchAsync(async (req, res) => {
  const alerts = await Alert.find({
    expiresAt: { $gt: new Date() }
  }).sort('-timestamp');
  
  res.status(200).json(alerts);
});

export const createAlert = catchAsync(async (req, res) => {
  const alert = await Alert.create(req.body);
  res.status(201).json(alert);
});

export const updateAlert = catchAsync(async (req, res) => {
  const alert = await Alert.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  
  if (!alert) {
    return res.status(404).json({ message: 'Alert not found' });
  }
  
  res.status(200).json(alert);
});

export const deleteAlert = catchAsync(async (req, res) => {
  const alert = await Alert.findByIdAndDelete(req.params.id);
  
  if (!alert) {
    return res.status(404).json({ message: 'Alert not found' });
  }
  
  res.status(204).json(null);
});