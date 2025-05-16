'use client';

import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import frLocale from '@fullcalendar/core/locales/fr';
import { CalendarEvent } from '@/types';

interface CalendarProps {
  events?: CalendarEvent[];
}

export default function Calendar({ events = [] }: CalendarProps) {
  const [currentView, setCurrentView] = useState<'dayGridMonth' | 'timeGridWeek'>('dayGridMonth');

  // Convertir les événements au format FullCalendar
  const calendarEvents = events.map(event => ({
    id: event.id,
    title: event.title,
    start: event.start,
    end: event.end,
    backgroundColor: event.backgroundColor || 
      (event.extendedProps?.type === 'reservation' ? '#3B82F6' : '#10B981'),
    borderColor: event.borderColor || 
      (event.extendedProps?.type === 'reservation' ? '#2563EB' : '#059669'),
    textColor: event.textColor || '#FFFFFF',
    extendedProps: event.extendedProps,
  }));

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="mb-4 flex justify-between items-center">
        <div className="flex space-x-2">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
            <span className="text-sm text-gray-600">Réservations</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <span className="text-sm text-gray-600">Ménage</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentView('dayGridMonth')}
            className={`px-3 py-1 text-sm rounded-md ${
              currentView === 'dayGridMonth'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Mois
          </button>
          <button
            onClick={() => setCurrentView('timeGridWeek')}
            className={`px-3 py-1 text-sm rounded-md ${
              currentView === 'timeGridWeek'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Semaine
          </button>
        </div>
      </div>
      <div>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView={currentView}
          locale={frLocale}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: '',
          }}
          events={calendarEvents}
          height="auto"
          aspectRatio={1.8}
          businessHours={{
            daysOfWeek: [1, 2, 3, 4, 5],
            startTime: '09:00',
            endTime: '17:00',
          }}
          selectable={true}
          weekends={true}
          nowIndicator={true}
          dayMaxEvents={3}
          eventTimeFormat={{
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          }}
          slotLabelFormat={{
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          }}
        />
      </div>
    </div>
  );
} 