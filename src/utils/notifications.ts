import { mockNotifications, type NotificationItem } from '../data/notifications';

const KEY = 'admin-dashboard-notifications';

export const getNotifications = (): NotificationItem[] => {
  const stored = localStorage.getItem(KEY);
  if (stored) {
    try {
      return JSON.parse(stored) as NotificationItem[];
    } catch {
      return mockNotifications;
    }
  }
  return mockNotifications;
};

export const saveNotifications = (items: NotificationItem[]) => {
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new Event('notifications-change'));
};

export const getUnreadCount = () => getNotifications().filter((item) => !item.read).length;
