import { useState, useEffect } from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';
import { incidentsApi } from '../api';

export default function IncidentReport() {
  const [formData, setFormData] = useState({
    type: '',
    location: {
      address: '',
      coordinates: {
        lat: 0,
        lng: 0
      }
    },
    description: '',
    severity: 'medium' as 'low' | 'medium' | 'high',
    reportedBy: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Automatically get user's location on component mount
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setFormData((prevData) => ({
          ...prevData,
          location: {
            ...prevData.location,
            coordinates: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          },
        }));
      });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    // Validate coordinates
    const { lat, lng } = formData.location.coordinates;
    if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      setError('Please enter valid coordinates.');
      setLoading(false);
      return;
    }
  
    try {
      const reportData = {
        ...formData,
        location: {
          address: formData.location.address,
          type: 'Point',
          coordinates: [formData.location.coordinates.lng, formData.location.coordinates.lat] // Correct order: [lng, lat]
        }
      };
  
      await incidentsApi.reportIncident(reportData);
      setSuccess(true);
      setFormData({
        type: '',
        location: {
          address: '',
          coordinates: { lat: 0, lng: 0 }
        },
        description: '',
        severity: 'medium',
        reportedBy: ''
      });
  
      // Reset success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError('Failed to submit report. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <AlertCircle className="h-6 w-6 text-red-500 mr-2" />
        <h2 className="text-2xl font-bold">Report an Incident</h2>
      </div>

      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded">
          Incident reported successfully! Emergency services have been notified.
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Incident Type</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            required
          >
            <option value="">Select type</option>
            <option value="flood">Flood</option>
            <option value="fire">Fire</option>
            <option value="earthquake">Earthquake</option>
            <option value="medical">Medical Emergency</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            value={formData.location.address}
            onChange={(e) => setFormData({
              ...formData,
              location: { ...formData.location, address: e.target.value }
            })}
            placeholder="Enter full address"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Latitude</label>
          <input
            type="number"
            step="any"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            value={formData.location.coordinates.lat}
            onChange={(e) => setFormData({
              ...formData,
              location: { 
                ...formData.location,
                coordinates: { 
                  ...formData.location.coordinates, 
                  lat: parseFloat(e.target.value) 
                }
              }
            })}
            placeholder="Enter latitude"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Longitude</label>
          <input
            type="number"
            step="any"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            value={formData.location.coordinates.lng}
            onChange={(e) => setFormData({
              ...formData,
              location: { 
                ...formData.location,
                coordinates: { 
                  ...formData.location.coordinates, 
                  lng: parseFloat(e.target.value) 
                }
              }
            })}
            placeholder="Enter longitude"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Provide detailed information about the incident"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Your Name</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            value={formData.reportedBy}
            onChange={(e) => setFormData({ ...formData, reportedBy: e.target.value })}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Severity</label>
          <div className="mt-1 flex space-x-4">
            {['low', 'medium', 'high'].map((severity) => (
              <label key={severity} className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-red-600"
                  name="severity"
                  value={severity}
                  checked={formData.severity === severity}
                  onChange={(e) => setFormData({
                    ...formData,
                    severity: e.target.value as 'low' | 'medium' | 'high'
                  })}
                />
                <span className="ml-2 capitalize">{severity}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
              Submitting...
            </>
          ) : (
            'Submit Report'
          )}
        </button>
      </form>
    </div>
  );
}
