import { useState } from 'react';
import clsx from 'clsx';
import { Popover } from './popover';
import { Column, TableRowBase } from '@/widgets/table/model';
// import { Column } from '@/widgets/table/applications/model';

import FilterIcon from '@assets/icons/table/filter-icon.svg';
import SortIcon from '@assets/icons/table/sort-icon.svg';

type TTableHeaderCell<T extends TableRowBase> = {
  column: Column<T>;
};

export function TableHeaderCell<T extends TableRowBase>({
  column,
}: TTableHeaderCell<T>) {
  const [showPopover, setShowPopover] = useState(false);
  const [sortActive, setSortActive] = useState(false);

  const handleClick = () => {
    if (column.filterable) {
      setShowPopover(true);
    } else if (column.sortable) {
      setSortActive(!sortActive);
    }
  };

  const isInteractive = column.sortable || column.filterable;

  return (
    <th
      className='px-4 py-6'
      style={{
        width: column.width,
        minWidth: column.minWidth,
        textAlign: column.align ?? 'left',
      }}
    >
      <div
        onClick={handleClick}
        className={clsx('flex items-center justify-between group', {
          'cursor-pointer relative': isInteractive,
        })}
      >
        <span
          className={clsx('transition-colors duration-300 text-dark-blue', {
            'group-hover:text-main-green': isInteractive,
          })}
        >
          {column.label}
        </span>

        {column.sortable && (
          <SortIcon
            className={clsx('transition-transform duration-200', {
              'rotate-180': sortActive,
            })}
          />
        )}

        {column.filterable && (
          <FilterIcon
            style={{ fill: showPopover ? '#1BAA75' : '#fff' }}
            // Примечание: Если SVG поддерживает классы для fill, можно заменить на:
            // className={showPopover ? 'fill-main-green' : 'fill-white'}
          />
        )}

        {column.filterable && (
          <Popover isOpen={showPopover} setIsOpen={setShowPopover} />
        )}
      </div>
    </th>
  );
}
