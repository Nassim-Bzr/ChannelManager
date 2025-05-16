import DashboardLayout from '@/components/layout/DashboardLayout';
import { BarChart, Home, Percent, TrendingUp, Users } from 'lucide-react';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Tableau de bord</h1>
        
        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard 
            title="Revenus ce mois" 
            value="€4,550" 
            change="+12.5%" 
            positive={true}
            icon={<TrendingUp className="h-6 w-6 text-blue-500" />}
          />
          <StatCard 
            title="Taux d&apos;occupation" 
            value="78%" 
            change="+5.2%" 
            positive={true}
            icon={<Percent className="h-6 w-6 text-green-500" />}
          />
          <StatCard 
            title="Réservations" 
            value="24" 
            change="-3.1%" 
            positive={false}
            icon={<BarChart className="h-6 w-6 text-purple-500" />}
          />
          <StatCard 
            title="Nouveaux clients" 
            value="18" 
            change="+7.4%" 
            positive={true}
            icon={<Users className="h-6 w-6 text-orange-500" />}
          />
        </div>
        
        {/* Contenu récent */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Réservations récentes */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Réservations récentes</h2>
              <a href="/reservations" className="text-sm text-blue-600 hover:text-blue-800">
                Voir tout
              </a>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start p-3 border-b border-gray-100">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <Home className="h-5 w-5 text-blue-700" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="font-medium">Appartement Paris {i}</p>
                      <span className="text-sm text-gray-500">il y a 2h</span>
                    </div>
                    <p className="text-sm text-gray-600">Pierre Dubois · 12-15 Nov · €380</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Tâches récentes */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Tâches à venir</h2>
              <a href="/cleaning" className="text-sm text-blue-600 hover:text-blue-800">
                Voir tout
              </a>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center p-3 border-b border-gray-100">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <div className="ml-3 flex-1">
                    <p className="font-medium">Ménage Appartement Lyon {i}</p>
                    <p className="text-sm text-gray-600">14 Nov, 2023 · 14:00</p>
                  </div>
                  <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                    À venir
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Calendrier de la semaine */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Calendrier de la semaine</h2>
            <a href="/calendar" className="text-sm text-blue-600 hover:text-blue-800">
              Voir tout
            </a>
          </div>
          <div className="border rounded-lg overflow-hidden">
            <div className="grid grid-cols-7 text-center border-b">
              {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day) => (
                <div key={day} className="py-2 font-medium text-sm text-gray-500">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 text-center h-48">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="border-r last:border-r-0 border-b p-1 relative">
                  <div className="text-xs text-gray-500 mb-1">{13 + i} Nov</div>
                  {i === 1 && (
                    <div className="absolute top-8 left-0 right-0 mx-1 p-1 text-xs bg-blue-100 text-blue-800 rounded overflow-hidden">
                      Arrivée: Famille Martin
                    </div>
                  )}
                  {i === 3 && (
                    <div className="absolute top-8 left-0 right-0 mx-1 p-1 text-xs bg-green-100 text-green-800 rounded overflow-hidden">
                      Ménage: Apt. Paris
                    </div>
                  )}
                  {i === 4 && (
                    <div className="absolute top-8 left-0 right-0 mx-1 p-1 text-xs bg-red-100 text-red-800 rounded overflow-hidden">
                      Départ: Dupont
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  positive: boolean;
  icon: React.ReactNode;
}

function StatCard({ title, value, change, positive, icon }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
          <div className={`flex items-center mt-2 text-sm ${positive ? 'text-green-600' : 'text-red-600'}`}>
            <span>{change}</span>
            <span className="ml-1 text-xs">depuis le mois dernier</span>
          </div>
        </div>
        <div>
          {icon}
        </div>
      </div>
    </div>
  );
} 