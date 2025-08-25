import React, { useEffect } from 'react';
import { getNumbers } from '../../utils';
import cn from 'classnames';
type Props = {
  total: number;
  perPage: string;
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

  function getItemsPerAge() {
    const copyItems = items;

    return copyItems.slice(
      (currentPage - 1) * +perPage,
      currentPage * +perPage,
    );
  }

  const visibleItems = getItemsPerAge();
  const pages: number[] = [];

  for (let i = 1; i <= Math.ceil(total / +perPage); i++) {
    pages.push(i);
  }

  useEffect(() => {}, [currentPage]);

  return (
    <>
      <ul className="pagination">
        <li className={cn('page-item', { disabled: currentPage === 1 })}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={() => onPageChange(pages.indexOf(currentPage))}
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
                onClick={() => {
                  onPageChange(page);
                }}
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
            onClick={() => onPageChange(pages.indexOf(currentPage) + 2)}
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
