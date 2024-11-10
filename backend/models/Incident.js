import mongoose from 'mongoose';

const incidentSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String,  // This stores the type of geometry (e.g., "Point")
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number], // This stores the longitude and latitude as an array [longitude, latitude]
      required: true
    },
    address: {
      type: String,
      required: true
    }
  },
  description: {
    type: String,
    required: true
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high'],
    required: true
  },
  status: {
    type: String,
    enum: ['reported', 'investigating', 'responding', 'resolved'],
    default: 'reported'
  },
  reportedBy: {
    type: String,
    required: true
  },
  updates: [{
    message: String,
    status: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }]
}, { timestamps: true });

// Index for geospatial queries
incidentSchema.index({ 'location.coordinates': '2dsphere' });

export default mongoose.model('Incident', incidentSchema);
