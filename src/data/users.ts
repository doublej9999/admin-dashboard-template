export type UserStatus = 'active' | 'invited' | 'suspended';

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  status: UserStatus;
}

export const mockUsers: UserRecord[] = [
  { id: 'U-1001', name: 'Ava Thompson', email: 'ava@acme.com', role: 'Admin', status: 'active' },
  { id: 'U-1002', name: 'Liam Rodriguez', email: 'liam@acme.com', role: 'Editor', status: 'active' },
  { id: 'U-1003', name: 'Isabella Chen', email: 'isabella@acme.com', role: 'Viewer', status: 'invited' },
  { id: 'U-1004', name: 'Noah Patel', email: 'noah@acme.com', role: 'Editor', status: 'active' },
  { id: 'U-1005', name: 'Mia Garcia', email: 'mia@acme.com', role: 'Viewer', status: 'suspended' },
  { id: 'U-1006', name: 'Oliver Smith', email: 'oliver@acme.com', role: 'Viewer', status: 'active' },
  { id: 'U-1007', name: 'Sophia Johnson', email: 'sophia@acme.com', role: 'Editor', status: 'active' },
  { id: 'U-1008', name: 'William Brown', email: 'william@acme.com', role: 'Viewer', status: 'invited' },
];
