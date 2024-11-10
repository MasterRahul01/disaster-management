import { Resource } from '../types';

export const resourcesApi = {
  getAllResources: async (): Promise<Resource[]> => {
    const response = await fetch('/api/resources');
    if (!response.ok) throw new Error('Failed to fetch resources');
    return response.json();
  },

  getResourcesByType: async (type: Resource['type']): Promise<Resource[]> => {
    const response = await fetch(`/api/resources?type=${type}`);
    if (!response.ok) throw new Error('Failed to fetch resources');
    return response.json();
  },

  updateResourceStatus: async (
    id: string,
    status: Resource['status'],
    capacity?: Resource['capacity']
  ): Promise<Resource> => {
    const response = await fetch(`/api/resources/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, capacity }),
    });
    if (!response.ok) throw new Error('Failed to update resource status');
    return response.json();
  },

  getNearbyResources: async (lat: number, lng: number, radius: number): Promise<Resource[]> => {
    const response = await fetch(`/api/resources/nearby?lat=${lat}&lng=${lng}&radius=${radius}`);
    if (!response.ok) throw new Error('Failed to fetch nearby resources');
    return response.json();
  },
};