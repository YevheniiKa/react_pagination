import React from 'react';
import { getNumbers } from '../../utils';
import cn from 'classnames';
type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const items = getNumbers(1, total).map(n => `Item ${n}`);

  function getItemsPerPage() {
    const copyItems = items;

    return copyItems.slice((currentPage - 1) * perPage, currentPage * perPage);
  }

  const visibleItems = getItemsPerPage();
  const pages: number[] = [];

  for (let i = 1; i <= Math.ceil(total / perPage); i++) {
    pages.push(i);
  }

  const handleNextPageLink = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (currentPage < pages.length) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrevPageLink = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleClickPageLink = (
    event: React.MouseEvent<HTMLAnchorElement>,
    page: number,
  ) => {
    event.preventDefault();
    if (currentPage !== page) {
      onPageChange(page);
    }
  };

  return (
    <>
      <ul className="pagination">
        <li className={cn('page-item', { disabled: currentPage === 1 })}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={handlePrevPageLink}
          >
            «
          </a>
        </li>
        {pages.map(page => {
          return (
            <li
              className={cn('page-item', { active: currentPage === page })}
              key={page}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href={`#${page}`}
                onClick={event => handleClickPageLink(event, page)}
              >
                {page}
              </a>
            </li>
          );
        })}

        <li
          className={cn('page-item', {
            disabled: currentPage === pages[pages.length - 1],
          })}
        >
          <a
            aria-disabled={currentPage === pages[pages.length - 1]}
            data-cy="nextLink"
            className="page-link"
            href="#next"
            onClick={handleNextPageLink}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {visibleItems.map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};
