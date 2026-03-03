import { useEffect, useMemo, useState } from 'react';

export const usePagination = <T,>(data: T[], pageSize: number) => {
  const [internalPage, setInternalPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(data.length / pageSize));
  const page = Math.min(Math.max(internalPage, 1), totalPages);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const pageData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, page, pageSize]);

  const setPage = (nextPage: number) => {
    setInternalPage(Math.min(Math.max(nextPage, 1), totalPages));
  };

  const next = () => setPage(page + 1);
  const prev = () => setPage(page - 1);

  return { page, setPage, totalPages, pageData, next, prev };
};
