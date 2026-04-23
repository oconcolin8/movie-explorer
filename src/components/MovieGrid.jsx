import { useState, useEffect } from 'react';
import MovieCard from './MovieCard';

const ITEMS_PER_PAGE = 20;

function MovieGrid({ movies, user, onRemove, showAddButtons, page: externalPage, totalPages: externalTotalPages, onPageChange }) {
  const [internalPage, setInternalPage] = useState(1);

  // Reset internal page when a new movie list arrives (client-side mode)
  useEffect(() => {
    setInternalPage(1);
  }, [movies]);

  const isServerPaged = onPageChange != null;
  const page = isServerPaged ? externalPage : internalPage;
  const totalPages = isServerPaged ? externalTotalPages : Math.ceil(movies.length / ITEMS_PER_PAGE);

  const visible = isServerPaged
    ? movies
    : movies.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const goTo = (p) => {
    if (isServerPaged) {
      onPageChange(p);
    } else {
      setInternalPage(p);
    }
  };

  const windowStart = Math.max(1, Math.min(page - 1, totalPages - 2));
  const windowEnd = Math.min(totalPages, windowStart + 2);
  const pageWindow = Array.from({ length: windowEnd - windowStart + 1 }, (_, i) => windowStart + i);

  return (
    <>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3 mt-1">
        {visible.map((movie) => (
          <div className="col" key={movie.id}>
            <MovieCard movie={movie} user={user} onRemove={onRemove} showAddButtons={showAddButtons} />
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <nav className="mt-4">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => goTo(page - 1)}>&laquo;</button>
            </li>

            {pageWindow.map(p => (
              <li key={p} className={`page-item ${page === p ? 'active' : ''}`}>
                <button className="page-link" onClick={() => goTo(p)}>{p}</button>
              </li>
            ))}

            <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => goTo(page + 1)}>&raquo;</button>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}

export default MovieGrid
