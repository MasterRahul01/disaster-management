import { AlertTriangle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Alert } from '../types';
import { alertsApi } from '../api';

export default function EmergencyAlert() {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const activeAlerts = await alertsApi.getActiveAlerts();
        setAlerts(activeAlerts);
      } catch (error) {
        console.error('Failed to fetch alerts:', error);
      }
    };

    fetchAlerts();
    const interval = setInterval(fetchAlerts, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  if (alerts.length === 0) return null;

  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`border-l-4 p-4 ${
            alert.severity === 'high'
              ? 'bg-red-50 border-red-400'
              : alert.severity === 'medium'
              ? 'bg-yellow-50 border-yellow-400'
              : 'bg-blue-50 border-blue-400'
          }`}
        >
          <div className="flex items-center">
            <AlertTriangle
              className={`h-6 w-6 ${
                alert.severity === 'high'
                  ? 'text-red-400'
                  : alert.severity === 'medium'
                  ? 'text-yellow-400'
                  : 'text-blue-400'
              }`}
            />
            <div className="ml-3">
              <h3 className="text-sm font-medium">{alert.title}</h3>
              <p className="text-sm mt-1">{alert.message}</p>
              <p className="text-xs mt-1 text-gray-500">
                Area: {alert.location.address} • Updated:{" "}
                {new Date(alert.updatedAt).toLocaleDateString("en-GB", {
                  weekday: "short", // Abbreviated weekday (e.g., "Thu")
                  day: "2-digit", // Day of the month (e.g., "23")
                  month: "short", // Abbreviated month (e.g., "Oct")
                  year: "numeric", // Full year (e.g., "2024")
                })}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
