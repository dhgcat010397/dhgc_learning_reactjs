import React from "react";

const getPageNumbers = (page, totalPages, maxButtons = 5) => {
  const pages = [];
  const half = Math.floor(maxButtons / 2);

  let start = Math.max(1, page - half);
  let end = Math.min(totalPages, page + half);

  if (end - start + 1 < maxButtons) {
    if (start === 1) {
      end = Math.min(totalPages, start + maxButtons - 1);
    } else if (end === totalPages) {
      start = Math.max(1, end - maxButtons + 1);
    }
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return { pages, start, end };
};

const Pagination = ({
  count,
  page,
  onChange,
  showFirstButton = false,
  showLastButton = false,
}) => {
  const { pages, start, end } = getPageNumbers(page, count, 5);

  const handleChange = (newPage) => {
    if (newPage >= 1 && newPage <= count && newPage !== page) {
      onChange(null, newPage);
    }
  };

  return (
    <div className="mt-4 flex items-center gap-2">
      {showFirstButton && (
        <button
          className="px-3 py-1 rounded bg-dark-100 text-white hover:bg-gray-600 disabled:opacity-50"
          onClick={() => handleChange(1)}
          disabled={page === 1}
        >
          {"<<"}
        </button>
      )}
      <button
        className="px-3 py-1 rounded bg-dark-100 text-white hover:bg-gray-600 disabled:opacity-50"
        onClick={() => handleChange(page - 1)}
        disabled={page === 1}
      >
        {"<"}
      </button>

      {start > 1 && (
        <>
          <button
            className="px-3 py-1 rounded bg-dark-100 text-white hover:bg-gray-600"
            onClick={() => onChange(null, 1)}
          >
            1
          </button>
          {start > 2 && <span className="text-white">...</span>}
        </>
      )}

      {pages.map((p) => (
        <button
          className={`px-3 py-1 rounded text-white ${
            p === page
              ? "bg-blue-600 font-bold"
              : "bg-dark-100 hover:bg-gray-600"
          }`}
          key={p}
          onClick={() => onChange(null, p)}
        >
          {p}
        </button>
      ))}

      {end < count && (
        <>
          {end < count - 1 && <span className="text-white">...</span>}
          <button
            className="px-3 py-1 rounded bg-dark-100 text-white hover:bg-gray-600"
            onClick={() => onChange(null, count)}
          >
            {count}
          </button>
        </>
      )}

      <button
        className="px-3 py-1 rounded bg-dark-100 text-white hover:bg-gray-600 disabled:opacity-50"
        onClick={() => handleChange(page + 1)}
        disabled={page === count}
      >
        {">"}
      </button>
      {showLastButton && (
        <button
          className="px-3 py-1 rounded bg-dark-100 text-white hover:bg-gray-600 disabled:opacity-50"
          onClick={() => handleChange(count)}
          disabled={page === count}
        >
          {">>"}
        </button>
      )}
    </div>
  );
};

export default Pagination;
