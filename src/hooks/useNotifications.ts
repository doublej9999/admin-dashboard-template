import { useEffect, useState } from 'react';
import { getNotifications } from '../utils/notifications';
import type { NotificationItem } from '../data/notifications';

export const useNotifications = () => {
  const [items, setItems] = useState<NotificationItem[]>(getNotifications());

  useEffect(() => {
    const handleChange = () => setItems(getNotifications());
    window.addEventListener('notifications-change', handleChange);
    window.addEventListener('storage', handleChange);
    return () => {
      window.removeEventListener('notifications-change', handleChange);
      window.removeEventListener('storage', handleChange);
    };
  }, []);

  return items;
};
