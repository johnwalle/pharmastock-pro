import React from 'react';

interface Props {
  total: number;
  page: number;
  perPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ total, page, perPage, onPageChange }: Props) {
  const totalPages = Math.ceil(total / perPage);
  const maxPageButtons = 5;

  // Calculate start and end page numbers for the page buttons
  let startPage = Math.max(1, page - Math.floor(maxPageButtons / 2));
  let endPage = startPage + maxPageButtons - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxPageButtons + 1);
  }

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const startItem = (page - 1) * perPage + 1;
  const endItem = Math.min(total, startItem + perPage - 1);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-t text-gray-600 text-sm space-y-2 sm:space-y-0">
      <div>
        Showing <span className="font-semibold">{startItem}</span> to{' '}
        <span className="font-semibold">{endItem}</span> of <span className="font-semibold">{total}</span> results
      </div>

      <nav aria-label="Pagination" className="inline-flex space-x-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className={`px-3 py-1 rounded-md border ${page === 1 ? 'cursor-not-allowed border-gray-300 text-gray-400' : 'border-gray-300 hover:bg-gray-100'
            }`}
          aria-label="Previous Page"
        >
          &lt;
        </button>

        {pageNumbers.map((num) => (
          <button
            key={num}
            onClick={() => onPageChange(num)}
            className={`px-3 py-1 rounded-md border ${num === page
                ? 'bg-blue-600 text-white border-blue-600'
                : 'border-gray-300 hover:bg-gray-100 text-gray-700'
              }`}
            aria-current={num === page ? 'page' : undefined}
          >
            {num}
          </button>
        ))}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className={`px-3 py-1 rounded-md border ${page === totalPages
              ? 'cursor-not-allowed border-gray-300 text-gray-400'
              : 'border-gray-300 hover:bg-gray-100'
            }`}
          aria-label="Next Page"
        >
          &gt;
        </button>
      </nav>
    </div>
  );
}
