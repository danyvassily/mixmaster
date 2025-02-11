'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { GlassWater } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, loading, error, signInWithGoogle, logout } = useAuth();

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/routes/cocktails', label: 'Cocktails' },
    { href: '/routes/bars', label: 'Bars' },
    { href: '/routes/mixologie', label: 'Mixologie' },
    { href: '/routes/create', label: 'Créer' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 text-xl font-bold text-white hover:text-blue-400 transition-colors">
            <GlassWater className="h-6 w-6" />
            <span>MixMaster</span>
          </Link>

          {/* Navigation desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-blue-400 ${
                  isActive(link.href) ? 'text-blue-400' : 'text-gray-300'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {user && (
              <Link
                href="/routes/mes-cocktails"
                className={`text-sm font-medium transition-colors hover:text-blue-400 ${
                  isActive('/routes/mes-cocktails') ? 'text-blue-400' : 'text-gray-300'
                }`}
              >
                Mes Cocktails
              </Link>
            )}
          </div>

          {/* Authentification */}
          <div className="flex items-center space-x-4">
            {error && (
              <div className="text-red-500 text-sm">
                {error}
              </div>
            )}
            
            {loading ? (
              <div className="text-gray-300">Chargement...</div>
            ) : user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-300 hidden md:inline-block">{user.email}</span>
                <button
                  onClick={logout}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700 transition-colors"
                  disabled={loading}
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <button
                onClick={signInWithGoogle}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
                disabled={loading}
              >
                Connexion
              </button>
            )}
          </div>

          {/* Bouton menu mobile */}
          <button
            className="md:hidden text-gray-300 hover:text-white ml-4"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-blue-400 ${
                    isActive(link.href) ? 'text-blue-400' : 'text-gray-300'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {user && (
                <Link
                  href="/routes/mes-cocktails"
                  className="text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Mes Cocktails
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 