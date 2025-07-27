import { useSearchParams } from 'react-router-dom';

const Pagination = ({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const goToPage = (page: number) => {
    const clamped = Math.max(1, Math.min(totalPages, page));
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', clamped.toString());
    setSearchParams(newParams);
  };

  return (
    <div className="flex gap-4 justify-center mt-6 text-white items-center">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage <= 1}
        className="px-3 py-1 rounded bg-slate-700 disabled:opacity-40"
      >
        Prev
      </button>
      <span className="text-lg">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="px-3 py-1 rounded bg-slate-700 disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
