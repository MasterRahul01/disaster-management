import mongoose from 'mongoose';

const emergencyContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  },
  available24x7: {
    type: Boolean,
    default: true
  },
  area: {
    type: String,
    required: true
  }
}, { timestamps: true });

export default mongoose.model('EmergencyContact', emergencyContactSchema);