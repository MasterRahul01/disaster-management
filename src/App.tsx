import React from 'react';
import Header from './components/Header';
import EmergencyAlert from './components/EmergencyAlert';
import ResourceMap from './components/ResourceMap';
import IncidentReport from './components/IncidentReport';
import EmergencyContacts from './components/EmergencyContacts';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <EmergencyAlert />
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <ResourceMap />
            <EmergencyContacts />
          </div>
          
          <div>
            <IncidentReport />
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">About</h3>
              <p className="text-gray-300">
                DisasterResponse provides real-time emergency management and response coordination.
                Available 24/7 for your safety and security.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#safety" className="text-gray-300 hover:text-white">Safety Guidelines</a></li>
                <li><a href="#prepare" className="text-gray-300 hover:text-white">Emergency Preparedness</a></li>
                <li><a href="#volunteer" className="text-gray-300 hover:text-white">Volunteer</a></li>
                <li><a href="#donate" className="text-gray-300 hover:text-white">Donate</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <p className="text-gray-300">
                Emergency Operations Center<br />
                1234 Response Street<br />
                Emergency City, EC 12345<br />
                24/7 Hotline: (555) 911-1234
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} DisasterResponse. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;