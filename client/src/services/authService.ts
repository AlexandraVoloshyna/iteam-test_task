import { backendApi } from '@/lib/axios';
import { User, Profile } from '@/types';

interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
  error?: string;
}

export const register = async (email: string, password: string, name: string): Promise<AuthResponse> => {
  try {
    const response = await backendApi.post('/auth/register', {
      email,
      password,
      name
    });
    return response.data;
  } catch (error) {
    const axiosError = error as { response?: { data?: { message?: string } } };
    return {
      success: false,
      token: '',
      user: {} as User,
      error: axiosError.response?.data?.message || 'Registration failed'
    };
  }
};

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await backendApi.post('/auth/login', {
      email,
      password
    });
    return response.data;
  } catch (error) {
    const axiosError = error as { response?: { data?: { message?: string } } };
    return {
      success: false,
      token: '',
      user: {} as User,
      error: axiosError.response?.data?.message || 'Login failed'
    };
  }
};

export const getCurrentUser = async (id: string): Promise<AuthResponse> => {
  try {
    const response = await backendApi.get(`/profile/${id}`);
    return response.data;
  } catch (error) {
    const axiosError = error as { response?: { data?: { message?: string } } };
    return {
      success: false,
      token: '',
      user: {} as User,
      error: axiosError.response?.data?.message || 'Failed to get profile'
    };
  }
};

export const updateProfile = async (id: string, profile: Profile): Promise<AuthResponse> => {
  try {
    const response = await backendApi.put(`/profile/${id}`, { profile });
    return response.data;
  } catch (error) {
    const axiosError = error as { response?: { data?: { message?: string } } };
    return {
      success: false,
      token: '',
      user: {} as User,
      error: axiosError.response?.data?.message || 'Failed to update profile'
    };
  }
};