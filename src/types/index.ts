export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

export interface Reservation {
  id: string;
  client: string;
  startDate: Date;
  endDate: Date;
  property: string;
  platform: string;
  amount: number;
  status: 'confirmed' | 'cancelled' | 'pending';
}

export interface CleaningTask {
  id: string;
  property: string;
  date: Date;
  status: 'pending' | 'completed';
  assignedTo?: string;
  notes?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  extendedProps?: {
    type: 'reservation' | 'cleaning';
    reservationId?: string;
    cleaningId?: string;
  };
}

export interface MenuItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

export interface Property {
  id: string;
  name: string;
  address: string;
  beds: number;
  bathrooms: number;
} 