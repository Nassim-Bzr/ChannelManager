import DashboardLayout from '@/components/layout/DashboardLayout';
import Calendar from '@/components/calendar/Calendar';
import { Plus, Filter } from 'lucide-react';
import { CalendarEvent } from '@/types';

export default function CalendarPage() {
  // Dans une vraie application, ces événements viendraient d'une API
  const sampleEvents: CalendarEvent[] = [];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight text-black">Calendrier</h1>
          <div className="flex space-x-4">
            <button className="inline-flex items-center px-3 py-2 border border-black shadow-sm text-sm leading-4 font-medium rounded-md text-black bg-white hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <Filter className="h-4 w-4 mr-2" />
              Filtrer
            </button>
            <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un événements
            </button>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="mb-6">
            <label htmlFor="property" className="block text-sm font-medium text-black mb-1">
              Propriété
            </label>
            <select
              id="property"
              name="property"
              className= "text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="all" className="font-medium text-black text-black">Toutes les propriétés</option>
              <option value="paris1" className="text-black">Appartement Paris 1</option>
              <option value="paris2" className="text-black">Appartement Paris 2</option>
              <option value="lyon1" className="text-black">Appartement Lyon 1</option>
            </select>
          </div>
          
          <Calendar events={sampleEvents} />
        </div>
      </div>
    </DashboardLayout>
  );
} 