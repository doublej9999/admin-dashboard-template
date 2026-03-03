export interface FileItem {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: string;
  previewUrl?: string;
}

export const mockFiles: FileItem[] = [
  {
    id: 'F-1001',
    name: 'Brand-guidelines.pdf',
    size: 2.4,
    type: 'PDF',
    uploadedAt: '2025-02-16 10:14',
  },
  {
    id: 'F-1002',
    name: 'Campaign-banner.png',
    size: 1.1,
    type: 'Image',
    uploadedAt: '2025-02-16 11:22',
    previewUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=200&q=60',
  },
];
