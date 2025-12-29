import { useState } from 'react';
import clsx from 'clsx';

import { Popover } from './popover';

import { Column } from '@/widgets/table/applications/model';

import FilterIcon from '@assets/icons/table/filter-icon.svg';
import SortIcon from '@assets/icons/table/sort-icon.svg';

export function TableHeaderCell<T> ({
  column,
}: {
  column: Column<T>;
}) {
  const [showPopover, setShowPopover] = useState(false);
  const [sortActive, setSortActive] = useState(false);

  const handleClick = () => {
    if (column.filterable) {
      setShowPopover(true);
    } else if (column.sortable) {
      setSortActive(!sortActive);
    } else {
      return null;
    }
  };

  return (
    <th
      style={{
        width: column.width,
        minWidth: column.minWidth,
        textAlign: column.align ?? 'left',
      }}
    >
      <div
        onClick={handleClick}
        className={clsx('table-header-cell', {
          clickable: column.sortable || column.filterable,
        })}
      >
        <span>{column.label}</span>

        {column.sortable && (
          <SortIcon
            style={{ transform: `rotate(${sortActive ? 180 : 0}deg)` }}
          />
        )}
        {column.filterable && (
          <FilterIcon style={{ fill: showPopover ? '#1BAA75' : '#fff' }} />
        )}

        {column.filterable && (
          <Popover isOpen={showPopover} setIsOpen={setShowPopover} />
        )}
      </div>
    </th>
  );
};
