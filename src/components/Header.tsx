import { Bell, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-red-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">DisasterResponse</h1>
          </div>
          
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li><a href="#home" className="hover:text-red-200">Home</a></li>
              <li><a href="#alerts" className="hover:text-red-200">Alerts</a></li>
              <li><a href="#resources" className="hover:text-red-200">Resources</a></li>
              <li><a href="#report" className="hover:text-red-200">Report Incident</a></li>
              <li><a href="#volunteer" className="hover:text-red-200">Volunteer</a></li>
            </ul>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-red-700">
              <Bell className="w-5 h-5" />
            </button>
            <button 
              className="md:hidden p-2 rounded-full hover:bg-red-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#home" className="block px-3 py-2 rounded-md hover:bg-red-700">Home</a>
            <a href="#alerts" className="block px-3 py-2 rounded-md hover:bg-red-700">Alerts</a>
            <a href="#resources" className="block px-3 py-2 rounded-md hover:bg-red-700">Resources</a>
            <a href="#report" className="block px-3 py-2 rounded-md hover:bg-red-700">Report Incident</a>
            <a href="#volunteer" className="block px-3 py-2 rounded-md hover:bg-red-700">Volunteer</a>
          </div>
        </div>
      )}
    </header>
  );
}