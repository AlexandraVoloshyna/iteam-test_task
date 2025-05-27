'use client';

import { createContext, useContext, ReactNode, useEffect } from 'react';
import { useAuth } from '@/hooks';

const AuthContext = createContext<ReturnType<typeof useAuth> | undefined>(undefined);


export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();

  
  useEffect(() => {
    if (auth.token && !auth.user) {
      auth.fetchCurrentUser(auth.user.id);
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}


export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
} 