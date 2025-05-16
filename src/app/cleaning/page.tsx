import DashboardLayout from '@/components/layout/DashboardLayout';
import { Search, Plus, Filter, Calendar, CheckCircle, Circle } from 'lucide-react';
import { CleaningTask } from '@/types';

export default function CleaningTasksPage() {
  // Dans une vraie application, ces données viendraient d'une API
  const cleaningTasks: CleaningTask[] = [];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Tâches de ménage</h1>
          <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <Plus className="h-4 w-4 mr-2" />
            Ajouter une tâche
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
                placeholder="Rechercher une tâche"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <Filter className="h-4 w-4 mr-2" />
              Filtrer
            </button>
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <Calendar className="h-4 w-4 mr-2" />
              Date
            </button>
            <select className="focus:ring-blue-500 focus:border-blue-500 h-10 py-0 pl-3 pr-8 border-gray-300 rounded-md">
              <option>Tous les statuts</option>
              <option>À faire</option>
              <option>Terminé</option>
            </select>
          </div>
        </div>

        {/* Liste des tâches */}
        <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-200">
          {cleaningTasks.length === 0 ? (
            <div className="p-16 text-center text-gray-500">
              <p className="text-lg font-medium">Aucune tâche de ménage</p>
              <p className="mt-1">Ajoutez votre première tâche pour la voir apparaître ici</p>
            </div>
          ) : (
            cleaningTasks.map((task) => (
              <div key={task.id} className="p-4 flex items-start">
                <div className="h-8 w-8 flex-shrink-0">
                  {task.status === 'completed' ? (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  ) : (
                    <Circle className="h-6 w-6 text-gray-300" />
                  )}
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex items-center justify-between">
                    <p className={`text-sm font-medium ${task.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                      {task.property}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(task.date).toLocaleDateString()}
                    </p>
                  </div>
                  {task.notes && (
                    <p className="mt-1 text-sm text-gray-500">{task.notes}</p>
                  )}
                  {task.assignedTo && (
                    <p className="mt-1 text-xs text-gray-500">
                      Assigné à: {task.assignedTo}
                    </p>
                  )}
                </div>
                <div className="ml-4">
                  <button className="text-sm text-blue-600 hover:text-blue-900">
                    Modifier
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Actions Rapides */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium mb-4">Actions rapides</h2>
          <div className="space-y-2">
            <button className="w-full flex items-center justify-between p-3 text-left border border-gray-200 rounded-md hover:bg-gray-50">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                <span>Générer des tâches pour les départs/arrivées</span>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </button>
            <button className="w-full flex items-center justify-between p-3 text-left border border-gray-200 rounded-md hover:bg-gray-50">
              <div className="flex items-center">
                <Users className="h-5 w-5 text-gray-400 mr-3" />
                <span>Assigner des tâches</span>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </button>
            <button className="w-full flex items-center justify-between p-3 text-left border border-gray-200 rounded-md hover:bg-gray-50">
              <div className="flex items-center">
                <Repeat className="h-5 w-5 text-gray-400 mr-3" />
                <span>Créer des tâches récurrentes</span>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function ChevronRight(props: React.SVGProps<SVGSVGElement>) {
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
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function Users(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function Repeat(props: React.SVGProps<SVGSVGElement>) {
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
      <polyline points="17 1 21 5 17 9" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <polyline points="7 23 3 19 7 15" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
  );
} 