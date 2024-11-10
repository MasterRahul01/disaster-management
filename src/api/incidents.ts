import { Incident } from '../types';

async function handleResponse(response: Response) {
  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Error: ${response.status} - ${response.statusText} - ${errorText}`);
    throw new Error(`Request failed with status ${response.status}: ${errorText || response.statusText}`);
  }
  return response.json();
}

export const incidentsApi = {
  reportIncident: async (incident: Omit<Incident, 'id' | 'status' | 'timestamp'>): Promise<Incident> => {
    
    const formattedIncident = {
      ...incident,
      location: {
        address: incident.location?.address,
        type: 'Point',
        coordinates: incident.location?.coordinates || [7, 23], // Default coordinates if missing
      },
    };
    const response = await fetch('/api/incidents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formattedIncident),
    });
    
    return handleResponse(response);
  },

  getActiveIncidents: async (): Promise<Incident[]> => {
    const response = await fetch('/api/incidents/active');
    return handleResponse(response);
  },

  updateIncidentStatus: async (
    id: string,
    status: Incident['status'],
    update?: { message: string }
  ): Promise<Incident> => {
    const response = await fetch(`/api/incidents/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, update }),
    });
    return handleResponse(response);
  },

  getIncidentsByArea: async (lat: number, lng: number, radius: number): Promise<Incident[]> => {
    const response = await fetch(`/api/incidents?lat=${lat}&lng=${lng}&radius=${radius}`);
    return handleResponse(response);
  },
};
