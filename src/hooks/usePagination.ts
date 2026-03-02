import { useMemo, useState } from 'react';

export const usePagination = <T,>(data: T[], pageSize: number) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(data.length / pageSize));

  const pageData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, page, pageSize]);

  const next = () => setPage((prev) => Math.min(prev + 1, totalPages));
  const prev = () => setPage((prev) => Math.max(prev - 1, 1));

  return { page, setPage, totalPages, pageData, next, prev };
};
