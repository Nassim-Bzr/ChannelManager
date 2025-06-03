'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Calendar, 
  ListChecks, 
  BarChart2, 
  LogOut, 
  Menu, 
  X, 
  BookOpen
} from 'lucide-react';
import { MenuItem } from '@/types';

const menuItems: MenuItem[] = [
  {
    title: 'Tableau de bord',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Calendrier',
    href: '/calendar',
    icon: Calendar,
  },
  {
    title: 'Réservations',
    href: '/reservations',
    icon: BookOpen,
  },
  {
    title: 'Tâches de ménage',
    href: '/cleaning',
    icon: ListChecks,
  },
  {
    title: 'Statistiques',
    href: '/stats',
    icon: BarChart2,
  },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const { signOut } = useAuth();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <aside 
      className={`bg-white border-r border-gray-200 transition-all duration-300 ease-in-out ${
        collapsed ? 'w-16' : 'w-64'
      } min-h-screen sticky top-0 z-30 flex flex-col`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed && (
          <div className="text-xl font-bold text-gray-800">LocManager</div>
        )}
        <button 
          onClick={toggleSidebar} 
          className={`p-1 rounded-md hover:bg-gray-100 ${collapsed ? 'mx-auto' : ''}`}
        >
          {collapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center p-3 rounded-md ${
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={collapsed ? 22 : 18} />
                  {!collapsed && <span className="ml-3">{item.title}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="border-t border-gray-200 p-4">
        <button
          onClick={signOut}
          className="flex items-center p-2 text-red-500 hover:bg-red-50 rounded-md w-full text-left"
        >
          <LogOut size={collapsed ? 22 : 18} />
          {!collapsed && <span className="ml-3">Déconnexion</span>}
        </button>
      </div>
    </aside>
  );
} 