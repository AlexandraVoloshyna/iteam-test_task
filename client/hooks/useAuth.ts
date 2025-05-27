'use client';

import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { login, register, getCurrentUser, updateProfile } from '@/services/authService';
import { User, Profile, AuthState } from '@/types';

export function useAuth() {
  const [token, setToken] = useLocalStorage<string | null>('token', null);
  const [user, setUser] = useLocalStorage<User | null>('user', null);
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
    error: null
  });


  useEffect(() => {
    setAuthState({
      user,
      token,
      isAuthenticated: !!token && !!user,
      isLoading: false,
      error: null
    });
  }, [token, user]);


  const registerUser = async (email: string, password: string, name: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    const response = await register(email, password, name);
    
    if (response.success) {
      setToken(response.token);
      setUser(response.user);
      setAuthState({
        user: response.user,
        token: response.token,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
      return true;
    } else {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: response.error || 'Registration failed'
      }));
      return false;
    }
  };

  // Login a user
  const loginUser = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    const response = await login(email, password);
    
    if (response.success) {
      setToken(response.token);
      setUser(response.user);
      setAuthState({
        user: response.user,
        token: response.token,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
      return true;
    } else {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: response.error || 'Login failed'
      }));
      return false;
    }
  };


  const logoutUser = () => {
    setToken(null);
    setUser(null);
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null
    });
  };

 
  const updateUserProfile = async (profile: Profile, id: string) => {
    if (!authState.isAuthenticated) {
      setAuthState(prev => ({
        ...prev,
        error: 'You must be logged in to update your profile'
      }));
      return false;
    }

    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    const response = await updateProfile(id, profile);
    
    if (response.success) {
      setUser(response.user);
      setAuthState(prev => ({
        ...prev,
        user: response.user,
        isLoading: false,
        error: null
      }));
      return true;
    } else {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: response.error || 'Failed to update profile'
      }));
      return false;
    }
  };

  
  const fetchCurrentUser = async (id:string) => {
    if (!token) return false;

    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    const response = await getCurrentUser(id);
    
    if (response.success) {
      setUser(response.user);
      setAuthState({
        user: response.user,
        token,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
      return true;
    } else {
      
      logoutUser();
      return false;
    }
  };

  return {
    ...authState,
    registerUser,
    loginUser,
    logoutUser,
    updateUserProfile,
    fetchCurrentUser
  };
} 