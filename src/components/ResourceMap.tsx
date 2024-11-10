import { MapPin, Activity, Users, Package } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Resource } from '../types';
import { resourcesApi } from '../api';

const typeIcons = {
  shelter: Users,
  medical: Activity,
  supplies: Package,
  rescue: MapPin,
};

export default function ResourceMap() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const data = await resourcesApi.getAllResources();
        setResources(data);
      } catch (error) {
        console.error('Failed to fetch resources:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="border rounded-lg p-4">
              <div className="flex justify-between">
                <div className="flex space-x-2">
                  <div className="h-5 w-5 bg-gray-200 rounded"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="h-3 bg-gray-200 rounded w-32"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                  <div className="h-3 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Emergency Resources</h2>
      <div className="grid gap-4">
        {resources.map((resource) => {
          const Icon = typeIcons[resource.type] || MapPin;
          const statusColor = 
            resource.status === 'open' ? 'bg-green-100 text-green-800' :
            resource.status === 'limited' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800';

          return (
            <div key={resource.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Icon className="h-5 w-5 text-red-500 mr-2" />
                  <div>
                    <h3 className="font-semibold">{resource.name}</h3>
                    <p className="text-sm text-gray-600">{resource.location.address}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-2 py-1 text-sm rounded-full ${statusColor}`}>
                    {resource.status}
                  </span>
                  <p className="text-sm text-gray-600 mt-1">
                    {resource.capacity.current}/{resource.capacity.total}
                  </p>
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                <p>Contact: {resource.contact.phone}</p>
                <p className="text-xs">Last updated: {new Date(resource.lastUpdated).toLocaleString()}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}