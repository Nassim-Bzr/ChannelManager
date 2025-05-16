import DashboardLayout from '@/components/layout/DashboardLayout';
import { Search, Filter, Plus, ChevronDown } from 'lucide-react';
import { Reservation } from '@/types';

export default function ReservationsPage() {
  // Dans une vraie application, ces données viendraient d'une API
  const reservations: Reservation[] = [];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Réservations</h1>
          <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <Plus className="h-4 w-4 mr-2" />
            Ajouter une réservation
          </button>
        </div>

        {/* Filtres et Recherche */}
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="w-full md:w-1/3">
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                placeholder="Rechercher une réservation"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <Filter className="h-4 w-4 mr-2" />
              Filtrer
            </button>
            <select className="focus:ring-blue-500 focus:border-blue-500 h-10 py-0 pl-3 pr-8 border-gray-300 rounded-md">
              <option>Toutes les propriétés</option>
              <option>Appartement Paris 1</option>
              <option>Appartement Paris 2</option>
            </select>
            <select className="focus:ring-blue-500 focus:border-blue-500 h-10 py-0 pl-3 pr-8 border-gray-300 rounded-md">
              <option>Tous les statuts</option>
              <option>Confirmé</option>
              <option>En attente</option>
              <option>Annulé</option>
            </select>
          </div>
        </div>

        {/* Tableau */}
        <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-1 cursor-pointer hover:text-gray-700">
                    <span>Client</span>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-1 cursor-pointer hover:text-gray-700">
                    <span>Dates</span>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-1 cursor-pointer hover:text-gray-700">
                    <span>Propriété</span>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-1 cursor-pointer hover:text-gray-700">
                    <span>Plateforme</span>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-1 cursor-pointer hover:text-gray-700">
                    <span>Montant</span>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-1 cursor-pointer hover:text-gray-700">
                    <span>Statut</span>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reservations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center text-gray-500">
                    <p className="text-lg font-medium">Aucune réservation</p>
                    <p className="mt-1">Ajoutez votre première réservation pour la voir apparaître ici</p>
                  </td>
                </tr>
              ) : (
                reservations.map((reservation) => (
                  <tr key={reservation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{reservation.client}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(reservation.startDate).toLocaleDateString()} - {new Date(reservation.endDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{reservation.property}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{reservation.platform}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">€{reservation.amount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${reservation.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                          reservation.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                          'bg-yellow-100 text-yellow-800'}`}
                      >
                        {reservation.status === 'confirmed' ? 'Confirmé' :
                          reservation.status === 'cancelled' ? 'Annulé' : 'En attente'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900">Modifier</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
} 