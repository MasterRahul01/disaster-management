import Incident from '../models/Incident.js';
import { catchAsync } from '../utils/catchAsync.js';

// Helper function to log errors
const logError = (error, location) => {
  console.error(`Error in ${location}:`, error);
};

// Improved reportIncident
export const reportIncident = catchAsync(async (req, res) => {
  console.log("Incoming data for reportIncident:", req.body);

// Extract coordinates and other necessary data
const { location, ...otherData } = req.body;

// Assuming location contains coordinates in the form { lat, lng }
const data = {
  ...otherData,
  location: {
    ...location,
    type: 'Point', // GeoJSON Point type
    coordinates: [location.coordinates[0], location.coordinates[1]] // Ensure [lng, lat] order
  }
};

// Log the processed data
console.log("Processed data to be saved:", data);

// Save the incident to the database
const incident = await Incident.create(data);
res.status(201).json(incident);

});

// Improved getActiveIncidents
export const getActiveIncidents = catchAsync(async (req, res) => {
  console.log("Fetching active incidents...");
  const incidents = await Incident.find({
    status: { $ne: 'resolved' }
  }).sort('-createdAt');

  console.log("Active incidents:", incidents);
  res.status(200).json(incidents);
});

// Improved updateIncidentStatus
export const updateIncidentStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status, update } = req.body;

  console.log(`Updating incident ${id} with status: ${status} and update:`, update);

  const incident = await Incident.findByIdAndUpdate(
    id,
    {
      status,
      $push: {
        updates: {
          message: update?.message || "No message provided",
          status,
          timestamp: new Date()
        }
      }
    },
    { new: true, runValidators: true }
  );

  if (!incident) {
    const errorMessage = `Incident with id ${id} not found`;
    logError(errorMessage, 'updateIncidentStatus');
    return res.status(404).json({ message: errorMessage });
  }

  console.log(`Updated incident ${id}:`, incident);
  res.status(200).json(incident);
});

// Improved getIncidentsByArea
export const getIncidentsByArea = catchAsync(async (req, res) => {
  const { lat, lng, radius = 5000 } = req.query;
  
  console.log("Getting incidents by area with params:", { lat, lng, radius });

  if (!lat || !lng) {
    const errorMessage = "Latitude and longitude are required for this query.";
    logError(errorMessage, 'getIncidentsByArea');
    return res.status(400).json({ message: errorMessage });
  }

  const incidents = await Incident.find({
    'location.coordinates': {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [parseFloat(lng), parseFloat(lat)]
        },
        $maxDistance: parseInt(radius)
      }
    }
  }).sort('-createdAt');

  console.log("Found incidents:", incidents);
  res.status(200).json(incidents);
});
