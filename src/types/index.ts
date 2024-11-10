export interface Alert {
  id: string;
  type: 'warning' | 'danger' | 'info';
  title: string;
  message: string;
  area: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
  expiresAt: string;
}

export interface Resource {
  id: string;
  type: 'shelter' | 'medical' | 'supplies' | 'rescue';
  name: string;
  location: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  status: 'open' | 'closed' | 'full' | 'limited';
  capacity: {
    current: number;
    total: number;
  };
  contact: {
    phone: string;
    email: string;
  };
  lastUpdated: string;
}

export interface Incident {
  id: string;
  type: string;
  location: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  description: string;
  severity: 'low' | 'medium' | 'high';
  status: 'reported' | 'investigating' | 'responding' | 'resolved';
  reportedBy: string;
  timestamp: string;
  updates?: {
    message: string;
    timestamp: string;
    status: string;
  }[];
}

export interface EmergencyContact {
  id: string;
  name: string;
  type: string;
  number: string;
  available24x7: boolean;
  area: string;
}