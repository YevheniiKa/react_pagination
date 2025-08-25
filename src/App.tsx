import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
const total = 42;

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setItemsPerPage(+event.currentTarget.value);
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  };

  const itemsFrom = +itemsPerPage * currentPage - +itemsPerPage + 1;
  const itemsTo =
    +itemsPerPage * currentPage > total &&
    currentPage === Math.ceil(total / +itemsPerPage)
      ? total
      : +itemsPerPage * currentPage;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {itemsFrom} - {itemsTo} of {total})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handleItemsPerPageChange}
            value={itemsPerPage}
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>
      <Pagination
        total={total} // total number of items to paginate
        perPage={itemsPerPage} // number of items per page
        currentPage={currentPage} /* optional with 1 by default */
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default App;
