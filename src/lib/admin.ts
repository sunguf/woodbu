import { createContext, useContext } from 'react';
import { useAuth } from './auth';
import { supabase } from './supabase';

export type AdminContextType = {
  isAdmin: boolean;
  loading: boolean;
};

export const AdminContext = createContext<AdminContextType>({
  isAdmin: false,
  loading: true,
});

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const checkIsAdmin = async (userId: string): Promise<boolean> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', userId)
    .single();

  if (error || !data) return false;
  return data.is_admin;
};