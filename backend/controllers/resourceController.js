import Resource from '../models/Resource.js';
import { catchAsync } from '../utils/catchAsync.js';

export const getAllResources = catchAsync(async (req, res) => {
  const resources = await Resource.find();
  res.status(200).json(resources);
});

export const getResourcesByType = catchAsync(async (req, res) => {
  const { type } = req.query;
  const resources = await Resource.find({ type });
  res.status(200).json(resources);
});

export const updateResourceStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status, capacity } = req.body;
  
  const resource = await Resource.findByIdAndUpdate(
    id,
    { 
      status,
      ...(capacity && { capacity }),
      lastUpdated: new Date()
    },
    { new: true, runValidators: true }
  );
  
  if (!resource) {
    return res.status(404).json({ message: 'Resource not found' });
  }
  
  res.status(200).json(resource);
});

export const getNearbyResources = catchAsync(async (req, res) => {
  const { lat, lng, radius = 5000 } = req.query; // radius in meters
  
  const resources = await Resource.find({
    'location.coordinates': {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [parseFloat(lng), parseFloat(lat)]
        },
        $maxDistance: parseInt(radius)
      }
    }
  });
  
  res.status(200).json(resources);
});