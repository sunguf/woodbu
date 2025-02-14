import React, { useEffect, useState } from 'react';
import { useAuth } from '../lib/auth';
import { AdminContext, checkIsAdmin } from '../lib/admin';

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAdmin() {
      if (!user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      const adminStatus = await checkIsAdmin(user.id);
      setIsAdmin(adminStatus);
      setLoading(false);
    }

    checkAdmin();
  }, [user]);

  return (
    <AdminContext.Provider value={{ isAdmin, loading }}>
      {children}
    </AdminContext.Provider>
  );
}