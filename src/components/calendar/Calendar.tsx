'use client';

import { useState, useEffect } from 'react';
import { CalendarEvent } from '@/types';
import { 
  ChevronLeftIcon, 
  ChevronRightIcon,
  CalendarDaysIcon,
  HomeIcon,
  UserGroupIcon,
  ClockIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import axios from 'axios';

interface CalendarProps {
  events?: CalendarEvent[];
}

interface Property {
  id: number;
  user_id: number;
  name: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  bookings?: Booking[];
}

interface Booking {
  id: number;
  property_id: number;
  platform: string;
  guest_name: string;
  check_in: string;
  check_out: string;
  total_amount: string;
  createdAt: string;
  updatedAt: string;
  Property?: Property;
}

export default function Calendar({ events = [] }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'Multi' | 'Simple'>('Multi');
  const [properties, setProperties] = useState<Property[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  // Récupérer les données depuis l'API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [propertiesRes, bookingsRes] = await Promise.all([
          axios.get('http://localhost:3001/api/properties'),
          axios.get('http://localhost:3001/api/bookings')
        ]);
        setProperties(propertiesRes.data);
        setBookings(bookingsRes.data);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Générer les jours du mois
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
  };

  const formatDayHeader = (date: Date) => {
    return date.toLocaleDateString('fr-FR', { weekday: 'short' }).slice(0, 3);
  };

  const formatDayNumber = (date: Date) => {
    return date.getDate();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const isDateInRange = (date: Date, booking: Booking) => {
    const checkIn = new Date(booking.check_in);
    const checkOut = new Date(booking.check_out);
    return date >= checkIn && date < checkOut;
  };

  const getBookingForPropertyAndDate = (propertyId: number, date: Date) => {
    return bookings.find(booking => 
      booking.property_id === propertyId && isDateInRange(date, booking)
    );
  };

  const isBookingStart = (date: Date, booking: Booking) => {
    const checkIn = new Date(booking.check_in);
    return date.toDateString() === checkIn.toDateString();
  };

  const isBookingEnd = (date: Date, booking: Booking) => {
    const checkOut = new Date(booking.check_out);
    const dayBefore = new Date(checkOut);
    dayBefore.setDate(checkOut.getDate() - 1);
    return date.toDateString() === dayBefore.toDateString();
  };

  const getBookingColor = (booking: Booking) => {
    if (booking.platform === 'airbnb') {
      if (booking.guest_name.includes('Not available')) {
        return { bg: '#EF4444', border: '#DC2626', text: '#FFFFFF' }; // Rouge pour indisponible
      }
      return { bg: '#06B6D4', border: '#0891B2', text: '#FFFFFF' }; // Cyan pour Airbnb
    }
    return { bg: '#8B5CF6', border: '#7C3AED', text: '#FFFFFF' }; // Violet par défaut
  };

  const days = generateCalendarDays();
  const upcomingBookings = bookings
    .filter(booking => new Date(booking.check_in) > new Date())
    .sort((a, b) => new Date(a.check_in).getTime() - new Date(b.check_in).getTime())
    .slice(0, 5);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement du calendrier...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header Élégant */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500 rounded-lg">
                <CalendarDaysIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Calendrier des Réservations</h2>
                <p className="text-sm text-gray-600">{properties.length} propriété(s) • {bookings.length} réservation(s)</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-white rounded-lg p-2 shadow-sm">
              <button
                onClick={() => navigateMonth('prev')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
              </button>
              <span className="text-lg font-semibold min-w-[160px] text-center text-gray-900">
                {formatMonth(currentDate)}
              </span>
              <button
                onClick={() => navigateMonth('next')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRightIcon className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode('Multi')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                viewMode === 'Multi'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <UserGroupIcon className="w-4 h-4 inline mr-2" />
              Multi
            </button>
            <button
              onClick={() => setViewMode('Simple')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                viewMode === 'Simple'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <CalendarDaysIcon className="w-4 h-4 inline mr-2" />
              Simple
            </button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar des Propriétés Amélioré */}
        <div className="w-64 border-r border-gray-200 bg-gradient-to-b from-gray-50 to-white">
          <div className="p-4 border-b border-gray-200 bg-white">
            <div className="flex items-center space-x-2">
              <HomeIcon className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Propriétés ({properties.length})
              </span>
            </div>
          </div>
          {properties.map((property, index) => (
            <div
              key={property.id}
              className="group px-4 py-3 border-b border-gray-100 bg-white hover:bg-blue-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  index % 3 === 0 ? 'bg-blue-500' : 
                  index % 3 === 1 ? 'bg-emerald-500' : 'bg-purple-500'
                }`}></div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    {property.name}
                  </div>
                  <div className="text-xs text-gray-500 flex items-center space-x-1">
                    <span>{property.address}</span>
                    <span>•</span>
                    <span>{property.bookings?.length || 0} rés.</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Grille de Calendrier Premium */}
        <div className="flex-1 overflow-x-auto bg-white">
          {/* En-têtes des jours */}
          <div className="flex border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white sticky top-0 z-10">
            {days.map((day, index) => {
              const isToday = day.toDateString() === new Date().toDateString();
              const isWeekend = day.getDay() === 0 || day.getDay() === 6;
              
              return (
                <div
                  key={index}
                  className={`min-w-[45px] flex-1 p-3 text-center border-r border-gray-200 ${
                    isToday ? 'bg-blue-100' : isWeekend ? 'bg-red-50' : ''
                  }`}
                >
                  <div className={`text-xs font-medium ${
                    isWeekend ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {formatDayHeader(day)}
                  </div>
                  <div className={`text-sm font-bold mt-1 ${
                    isToday ? 'text-blue-600 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mx-auto' :
                    isWeekend ? 'text-red-600' : 'text-gray-900'
                  }`}>
                    {formatDayNumber(day)}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Lignes des propriétés */}
          {properties.map((property, propIndex) => (
            <div key={property.id} className="flex border-b border-gray-100 group hover:bg-blue-50/30 transition-colors">
              {days.map((day, dayIndex) => {
                const booking = getBookingForPropertyAndDate(property.id, day);
                const isWeekend = day.getDay() === 0 || day.getDay() === 6;
                
                return (
                  <div
                    key={dayIndex}
                    className={`min-w-[45px] flex-1 h-16 border-r border-gray-100 relative ${
                      isWeekend ? 'bg-red-50/30' : ''
                    }`}
                  >
                    {booking && (
                      <div
                        className={`absolute inset-1 rounded-lg text-white text-xs flex items-center justify-center font-medium shadow-sm ${
                          isBookingStart(day, booking) ? 'rounded-l-lg' : 'rounded-l-none'
                        } ${
                          isBookingEnd(day, booking) ? 'rounded-r-lg' : 'rounded-r-none'
                        } hover:shadow-md transition-shadow cursor-pointer`}
                        style={{
                          backgroundColor: getBookingColor(booking).bg,
                          borderColor: getBookingColor(booking).border,
                          color: getBookingColor(booking).text,
                        }}
                        title={`${booking.guest_name} (${booking.platform})\n${new Date(booking.check_in).toLocaleDateString('fr-FR')} - ${new Date(booking.check_out).toLocaleDateString('fr-FR')}`}
                      >
                        {isBookingStart(day, booking) && (
                          <div className="truncate px-2 flex items-center space-x-1">
                            <SparklesIcon className="w-3 h-3" />
                            <span className="font-semibold">
                              {booking.guest_name.replace('Airbnb (Not available)', 'Indisponible')}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Footer Premium avec informations */}
      <div className="border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white p-6">
        <div className="grid grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <ClockIcon className="w-5 h-5 text-blue-500" />
              <h3 className="text-sm font-bold text-gray-900">Réservations à venir</h3>
            </div>
            <div className="space-y-3">
              {upcomingBookings.slice(0, 3).map((booking) => (
                <div key={booking.id} className="flex items-center justify-between text-sm bg-white p-3 rounded-lg shadow-sm">
                  <div className="flex items-center space-x-3">
                    <div className={`text-xs px-2 py-1 rounded-full font-medium ${
                      booking.platform === 'airbnb' ? 'bg-cyan-100 text-cyan-700' : 'bg-purple-100 text-purple-700'
                    }`}>
                      {booking.platform.toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {booking.guest_name.replace('Airbnb (Not available)', 'Indisponible')}
                      </div>
                      <div className="text-gray-500 text-xs">
                        {properties.find(p => p.id === booking.property_id)?.name}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">
                      {new Date(booking.check_in).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <UserGroupIcon className="w-5 h-5 text-emerald-500" />
              <h3 className="text-sm font-bold text-gray-900">Statistiques</h3>
            </div>
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-emerald-600">{bookings.length}</div>
                <div className="text-xs text-gray-500">Total réservations</div>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-blue-600">{properties.length}</div>
                <div className="text-xs text-gray-500">Propriétés actives</div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-4">
              <SparklesIcon className="w-5 h-5 text-purple-500" />
              <h3 className="text-sm font-bold text-gray-900">Activité récente</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm bg-white p-3 rounded-lg shadow-sm">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <div className="flex-1">
                  <span className="font-medium">Nouvelle synchronisation</span>
                  <div className="text-gray-500 text-xs">Il y a 2 heures</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-sm bg-white p-3 rounded-lg shadow-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <span className="font-medium">Calendrier mis à jour</span>
                  <div className="text-gray-500 text-xs">Il y a 1 jour</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 