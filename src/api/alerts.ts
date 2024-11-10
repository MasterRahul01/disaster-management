import { Alert } from '../types';

export const alertsApi = {
  getActiveAlerts: async (): Promise<Alert[]> => {
    const response = await fetch('/api/incidents/active');
    if (!response.ok) throw new Error('Failed to fetch alerts');
    return response.json();
  },

  createAlert: async (alert: Omit<Alert, 'id'>): Promise<Alert> => {
    const response = await fetch('/api/alerts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(alert),
    });
    if (!response.ok) throw new Error('Failed to create alert');
    return response.json();
  },

  updateAlert: async (id: string, alert: Partial<Alert>): Promise<Alert> => {
    const response = await fetch(`/api/alerts/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(alert),
    });
    if (!response.ok) throw new Error('Failed to update alert');
    return response.json();
  },

  deleteAlert: async (id: string): Promise<void> => {
    const response = await fetch(`/api/alerts/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete alert');
  },
};