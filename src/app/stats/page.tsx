import DashboardLayout from '@/components/layout/DashboardLayout';
import { RevenueChart, OccupancyChart, PlatformChart } from '@/components/stats/StatCharts';
import { TrendingUp, Users, CreditCard } from 'lucide-react';

export default function StatsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Statistiques</h1>
          <div className="flex space-x-2">
            <select className="block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
              <option>Année en cours</option>
              <option>2023</option>
              <option>2022</option>
            </select>
            <select className="block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
              <option>Tous les biens</option>
              <option>Appartement Paris 1</option>
              <option>Appartement Paris 2</option>
              <option>Appartement Lyon 1</option>
            </select>
          </div>
        </div>

        {/* Cartes de stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Revenus totaux"
            value="€38,450"
            change="+12.5%"
            positive={true}
            icon={<TrendingUp className="h-6 w-6 text-blue-500" />}
          />
          <StatCard
            title="Nuitées"
            value="245"
            change="+8.3%"
            positive={true}
            icon={<CalendarCheck className="h-6 w-6 text-purple-500" />}
          />
          <StatCard
            title="Taux d'occupation"
            value="78%"
            change="+5.2%"
            positive={true}
            icon={<Users className="h-6 w-6 text-green-500" />}
          />
          <StatCard
            title="Revenu moyen/nuit"
            value="€157"
            change="+3.8%"
            positive={true}
            icon={<CreditCard className="h-6 w-6 text-orange-500" />}
          />
        </div>

        {/* Graphiques */}
        <div className="space-y-5">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium mb-4">Revenus mensuels</h2>
            <RevenueChart />
          </div>
          
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium mb-4">Taux d&apos;occupation</h2>
              <OccupancyChart />
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium mb-4">Répartition par plateforme</h2>
              <PlatformChart />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium mb-4">Statistiques détaillées</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Propriété
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Revenus
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nuitées
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Taux d&apos;occ.
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rev. moyen
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Appartement Paris 1
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      €15,250
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      98
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      82%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      €155
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Appartement Paris 2
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      €13,100
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      87
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      75%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      €150
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Appartement Lyon 1
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      €10,100
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      60
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      68%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      €168
                    </td>
                  </tr>
                </tbody>
              </table>
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
            <span className="ml-1 text-xs">vs année précédente</span>
          </div>
        </div>
        <div>
          {icon}
        </div>
      </div>
    </div>
  );
}

function CalendarCheck(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <path d="M9 16l2 2 4-4" />
    </svg>
  );
} 