import { useEffect, useState } from 'react';
import { getCurrentRole } from '../utils/rbac';

export const useRole = () => {
  const [role, setRole] = useState(getCurrentRole());

  useEffect(() => {
    const handleChange = () => setRole(getCurrentRole());
    window.addEventListener('role-change', handleChange);
    window.addEventListener('storage', handleChange);
    return () => {
      window.removeEventListener('role-change', handleChange);
      window.removeEventListener('storage', handleChange);
    };
  }, []);

  return role;
};
