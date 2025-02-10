'use client';

import { createContext, useContext, useEffect, useState, useRef } from 'react';
import { User, signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
  signInWithGoogle: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const mounted = useRef(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    mounted.current = true;
    
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (mounted.current) {
        setUser(user);
        setLoading(false);
      }
    }, (error) => {
      if (mounted.current) {
        console.error('Erreur de surveillance auth:', error);
        setError(error.message);
        setLoading(false);
      }
    });

    return () => {
      mounted.current = false;
      unsubscribe();
    };
  }, [isClient]);

  const signInWithGoogle = async () => {
    if (!mounted.current) return;
    
    try {
      setError(null);
      setLoading(true);
      googleProvider.setCustomParameters({
        prompt: 'select_account'
      });
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      console.error('Erreur lors de la connexion avec Google:', error);
      let errorMessage = 'Une erreur est survenue lors de la connexion';
      
      if (error.code === 'auth/configuration-not-found') {
        errorMessage = 'La configuration de l\'authentification Google n\'est pas correcte. Veuillez contacter l\'administrateur.';
      } else if (error.code === 'auth/popup-blocked') {
        errorMessage = 'Le popup de connexion a été bloqué. Veuillez autoriser les popups pour ce site.';
      } else if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'La fenêtre de connexion a été fermée. Veuillez réessayer.';
      }
      
      if (mounted.current) {
        setError(errorMessage);
      }
    } finally {
      if (mounted.current) {
        setLoading(false);
      }
    }
  };

  const logout = async () => {
    if (!mounted.current) return;
    
    try {
      setError(null);
      setLoading(true);
      await signOut(auth);
    } catch (error: any) {
      console.error('Erreur lors de la déconnexion:', error);
      if (mounted.current) {
        setError('Une erreur est survenue lors de la déconnexion');
      }
    } finally {
      if (mounted.current) {
        setLoading(false);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, signInWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 