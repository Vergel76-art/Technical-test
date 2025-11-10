interface Props {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
}

export function PaginationControls({ page, pageSize, total, onPageChange }: Props) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const prevDisabled = page <= 1;
  const nextDisabled = page >= totalPages;

  return (
    <div className="flex items-center gap-2">
      <button
        className="rounded border px-3 py-1 text-sm disabled:opacity-50"
        disabled={prevDisabled}
        onClick={() => onPageChange(page - 1)}
      >
        Previous
      </button>
      <span className="text-sm text-gray-600">Page {page} of {totalPages}</span>
      <button
        className="rounded border px-3 py-1 text-sm disabled:opacity-50"
        disabled={nextDisabled}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
}