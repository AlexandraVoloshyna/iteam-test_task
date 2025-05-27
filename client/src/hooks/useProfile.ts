'use client';

import { useLocalStorage } from './useLocalStorage';
import { Profile } from '@/types';

export function useProfile() {
  const [profile, setProfile] = useLocalStorage<Profile | null>('userProfile', null);

  
  const saveProfile = (profileData: Profile) => {
    setProfile(profileData);
  };

  
  const clearProfile = () => {
    setProfile(null);
  };

 
  const hasProfile = () => {
    return profile !== null;
  };

  return {
    profile,
    saveProfile,
    clearProfile,
    hasProfile,
  };
} 