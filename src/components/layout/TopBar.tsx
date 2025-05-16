'use client';

import { Bell, Search, User } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function TopBar() {
  const [showProfile, setShowProfile] = useState(false);
  const { user, signOut } = useAuth();
  const router = useRouter();

  // Si l'utilisateur n'est pas connecté, rediriger vers la page d'authentification
  useEffect(() => {
    if (!user) {
      console.log('User not logged in, redirecting to auth page...');
      router.push('/auth');
    }
  }, [user, router]);

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  const handleSignOut = async () => {
    console.log('User clicked sign out');
    
    try {
      await signOut();
      // La redirection est gérée dans la fonction signOut
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (!user) {
    return null; // Ne pas afficher la topbar si l'utilisateur n'est pas connecté
  }

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-20">
      {/* Logo en mode mobile */}
      <div className="block md:hidden">
        <span className="text-xl font-bold text-gray-800">LocManager</span>
      </div>

      {/* Recherche */}
      <div className="hidden md:flex items-center mx-2 flex-1 max-w-md">
        <div className="w-full relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Rechercher..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <button className="p-2 rounded-full hover:bg-gray-100 relative">
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={toggleProfile}
            className="flex items-center focus:outline-none"
          >
            {user.photoURL ? (
              <img 
                src={user.photoURL} 
                alt={user.displayName || "Profil"} 
                className="h-8 w-8 rounded-full object-cover border border-gray-200"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                <User className="h-4 w-4" />
              </div>
            )}
            <span className="hidden md:block ml-2 text-sm font-medium">
              {user.displayName || user.email || "Utilisateur"}
            </span>
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 py-1 border border-gray-200">
              <Link
                href="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Mon profil
              </Link>
              <Link
                href="/settings"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Paramètres
              </Link>
              <div className="border-t border-gray-200 my-1"></div>
              <button
                onClick={handleSignOut}
                className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
              >
                Déconnexion
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
} 