export interface AuditLogRecord {
  id: string;
  user: string;
  action: string;
  target: string;
  result: 'Success' | 'Failed';
  time: string;
}

export const mockAuditLogs: AuditLogRecord[] = [
  {
    id: 'A-1001',
    user: 'Jordan Lee',
    action: 'Create user',
    target: 'Ava Thompson',
    result: 'Success',
    time: '2025-02-16 09:12',
  },
  {
    id: 'A-1002',
    user: 'Jordan Lee',
    action: 'Update role',
    target: 'Editor',
    result: 'Success',
    time: '2025-02-16 10:04',
  },
  {
    id: 'A-1003',
    user: 'Chris Park',
    action: 'Delete user',
    target: 'Noah Patel',
    result: 'Failed',
    time: '2025-02-16 11:08',
  },
  {
    id: 'A-1004',
    user: 'Mia Garcia',
    action: 'Export report',
    target: 'Monthly sales',
    result: 'Success',
    time: '2025-02-16 12:45',
  },
  {
    id: 'A-1005',
    user: 'Chris Park',
    action: 'Login',
    target: 'Admin portal',
    result: 'Success',
    time: '2025-02-16 13:22',
  },
  {
    id: 'A-1006',
    user: 'Jordan Lee',
    action: 'Update settings',
    target: 'Theme',
    result: 'Success',
    time: '2025-02-16 14:55',
  },
  {
    id: 'A-1007',
    user: 'Mia Garcia',
    action: 'Download invoice',
    target: 'INV-3022',
    result: 'Success',
    time: '2025-02-16 15:11',
  },
];
