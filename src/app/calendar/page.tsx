'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Calendar from '@/components/calendar/Calendar';
import { Plus, Filter } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CalendarEvent } from '@/types';
import axios from 'axios';

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/bookings')
      .then(response => {
        const bookings = response.data.map((booking: any) => ({
          id: booking.id,
          title: booking.Property.name || booking.guest_name || 'Réservation Airbnb',
          start: booking.check_in,
          end: booking.check_out,
          extendedProps: {
            type: 'reservation',
          },
        }));
        setEvents(bookings);
      })
      .catch(err => console.error("Erreur chargement bookings:", err));
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight text-black">Calendrier</h1>
          <div className="flex space-x-4">
            <button className="inline-flex items-center px-3 py-2 border border-black shadow-sm text-sm leading-4 font-medium rounded-md text-black bg-white hover:bg-white">
              <Filter className="h-4 w-4 mr-2" />
              Filtrer
            </button>
            <button className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un événement
            </button>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <Calendar events={events} />
        </div>
      </div>
    </DashboardLayout>
  );
}
