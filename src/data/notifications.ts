export interface NotificationItem {
  id: string;
  title: string;
  detail: string;
  time: string;
  read: boolean;
}

export const mockNotifications: NotificationItem[] = [
  {
    id: 'N-1001',
    title: 'New order received',
    detail: 'Order #ORD-10258 is awaiting confirmation.',
    time: '2 min ago',
    read: false,
  },
  {
    id: 'N-1002',
    title: 'Refund processed',
    detail: 'Refund issued for order #ORD-10241.',
    time: '1 hour ago',
    read: false,
  },
  {
    id: 'N-1003',
    title: 'New user signed up',
    detail: 'Liam Rodriguez just joined the workspace.',
    time: '3 hours ago',
    read: true,
  },
];
