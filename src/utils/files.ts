import { mockFiles, type FileItem } from '../data/files';

const KEY = 'admin-dashboard-files';

export const getFiles = (): FileItem[] => {
  const stored = localStorage.getItem(KEY);
  if (stored) {
    try {
      return JSON.parse(stored) as FileItem[];
    } catch {
      return mockFiles;
    }
  }
  return mockFiles;
};

export const saveFiles = (items: FileItem[]) => {
  localStorage.setItem(KEY, JSON.stringify(items));
};
