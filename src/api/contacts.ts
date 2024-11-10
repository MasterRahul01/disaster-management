import { EmergencyContact } from '../types';

export const contactsApi = {
  getAllContacts: async (): Promise<EmergencyContact[]> => {
    const response = await fetch('/api/contacts');
    if (!response.ok) throw new Error('Failed to fetch contacts');
    return response.json();
  },

  getContactsByArea: async (area: string): Promise<EmergencyContact[]> => {
    const response = await fetch(`/api/contacts?area=${area}`);
    if (!response.ok) throw new Error('Failed to fetch contacts');
    return response.json();
  },

  getContactsByType: async (type: string): Promise<EmergencyContact[]> => {
    const response = await fetch(`/api/contacts?type=${type}`);
    if (!response.ok) throw new Error('Failed to fetch contacts');
    return response.json();
  },
};