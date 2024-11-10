import { Phone, Ambulance, Building2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { EmergencyContact } from '../types';
import { contactsApi } from '../api';

const typeIcons: Record<string, any> = {
  'hotline': Phone,
  'ambulance': Ambulance,
  'fire': Building2,
};

export default function EmergencyContacts() {
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await contactsApi.getAllContacts();
        setContacts(data);
      } catch (error) {
        console.error('Failed to fetch contacts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Emergency Contacts</h2>
      <div className="grid gap-4">
        {contacts.map((contact) => {
          const Icon = typeIcons[contact.type.toLowerCase()] || Phone;
          return (
            <div key={contact.id} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <Icon className="h-6 w-6 text-red-500 mr-3" />
              <div className="flex-grow">
                <p className="font-medium">{contact.name}</p>
                <p className="text-xl font-bold text-red-600">{contact.number}</p>
                {contact.available24x7 && (
                  <span className="text-xs text-green-600">Available 24/7</span>
                )}
              </div>
              <div className="text-sm text-gray-500">
                {contact.area}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}