'use client';

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Données pour les graphiques - En réalité, elles viendraient d'une API
const revenueData = [
  { name: 'Jan', amount: 1500 },
  { name: 'Fév', amount: 1800 },
  { name: 'Mar', amount: 2200 },
  { name: 'Avr', amount: 2500 },
  { name: 'Mai', amount: 3000 },
  { name: 'Juin', amount: 3500 },
  { name: 'Juil', amount: 4200 },
  { name: 'Août', amount: 4500 },
  { name: 'Sep', amount: 4000 },
  { name: 'Oct', amount: 3700 },
  { name: 'Nov', amount: 3200 },
  { name: 'Déc', amount: 2800 },
];

const occupancyData = [
  { name: 'Jan', rate: 45 },
  { name: 'Fév', rate: 52 },
  { name: 'Mar', rate: 60 },
  { name: 'Avr', rate: 68 },
  { name: 'Mai', rate: 75 },
  { name: 'Juin', rate: 85 },
  { name: 'Juil', rate: 95 },
  { name: 'Août', rate: 98 },
  { name: 'Sep', rate: 88 },
  { name: 'Oct', rate: 78 },
  { name: 'Nov', rate: 65 },
  { name: 'Déc', rate: 55 },
];

const platformData = [
  { name: 'Airbnb', value: 45 },
  { name: 'Booking', value: 28 },
  { name: 'Expedia', value: 15 },
  { name: 'Direct', value: 12 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export function RevenueChart() {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={revenueData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value) => `€${value}`} />
          <Legend />
          <Bar dataKey="amount" name="Revenus (€)" fill="#3B82F6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function OccupancyChart() {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={occupancyData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value) => `${value}%`} />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="rate" 
            name="Taux d'occupation (%)" 
            stroke="#10B981" 
            strokeWidth={2} 
            dot={{ r: 4 }} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function PlatformChart() {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={platformData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {platformData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value}%`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
} 