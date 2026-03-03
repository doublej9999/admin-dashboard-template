import { useMemo, useState } from 'react';
import clsx from 'clsx';
import { getFiles, saveFiles } from '../utils/files';
import type { FileItem } from '../data/files';
import { useI18n } from '../contexts/useI18n';

const FilesPage = () => {
  const [files, setFiles] = useState<FileItem[]>(getFiles());
  const { t } = useI18n();

  const totalSize = useMemo(() => files.reduce((sum, file) => sum + file.size, 0), [files]);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0];
    if (!selected) return;
    const type = selected.type.startsWith('image') ? 'Image' : 'Document';
    const next: FileItem = {
      id: `F-${Math.floor(Math.random() * 9000) + 1000}`,
      name: selected.name,
      size: Number((selected.size / 1024 / 1024).toFixed(2)),
      type,
      uploadedAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      previewUrl: selected.type.startsWith('image') ? URL.createObjectURL(selected) : undefined,
    };
    const updated = [next, ...files];
    setFiles(updated);
    saveFiles(updated);
  };

  const handleDelete = (id: string) => {
    const updated = files.filter((file) => file.id !== id);
    setFiles(updated);
    saveFiles(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 density-pad md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-base-500">{t('files.storage')}</p>
          <h1 className="text-2xl font-semibold text-base-900 dark:text-base-100">{t('files.title')}</h1>
          <p className="text-sm text-base-500">
            {totalSize.toFixed(2)} {t('files.used')}
          </p>
        </div>
        <label className="inline-flex items-center gap-2 density-pad rounded-xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white cursor-pointer">
          {t('files.upload')}
          <input type="file" className="hidden" onChange={handleUpload} />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-5 density-pad lg:grid-cols-3">
        {files.map((file) => (
          <div key={file.id} className="card-shell border border-base-200 dark:border-base-700 bg-white dark:bg-base-800 p-5 density-pad shadow-card density-pad">
            <div className="h-36 rounded-xl bg-base-100 dark:bg-base-700/60 flex items-center justify-center overflow-hidden">
              {file.previewUrl ? (
                <img src={file.previewUrl} alt={file.name} className="h-full w-full object-cover" />
              ) : (
                <div className="text-sm text-base-400">{t('files.previewUnavailable')}</div>
              )}
            </div>
            <div className="mt-4">
              <p className="text-sm font-semibold text-base-800 dark:text-base-100">{file.name}</p>
              <p className="text-xs text-base-400">{file.uploadedAt}</p>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs">
              <span className={clsx('rounded-full px-2 py-1', 'bg-base-100 dark:bg-base-700/60 text-base-500')}>
                {file.type}
              </span>
              <span className="text-base-400">{file.size.toFixed(2)} MB</span>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <button className="text-xs text-brand-500">{t('files.preview')}</button>
              <button onClick={() => handleDelete(file.id)} className="text-xs text-danger">{t('files.delete')}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilesPage;
