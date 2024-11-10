import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['shelter', 'medical', 'supplies', 'rescue'],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  location: {
    address: {
      type: String,
      required: true
    },
    coordinates: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number],
        required: true
      }
    }
  },
  status: {
    type: String,
    enum: ['open', 'closed', 'full', 'limited'],
    required: true
  },
  capacity: {
    current: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    }
  },
  contact: {
    phone: String,
    email: String
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

resourceSchema.index({ 'location.coordinates': '2dsphere' });

export default mongoose.model('Resource', resourceSchema);