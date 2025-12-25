import { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

import { Popover } from './popover';

import { Application, Column } from '@/widgets/table/applications/model';

import filterIcon from '@assets/icons/table/filter-icon.svg';
import sortIcon from '@assets/icons/table/sort-icon.svg';

export const TableHeaderCell = ({
  column,
}: {
  column: Column<Application>;
}) => {
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
          <Image
            src={sortIcon}
            alt='sortIcon'
            style={{ transform: `rotate(${sortActive ? 180 : 0}deg)` }}
          />
        )}
        {column.filterable && <Image src={filterIcon} alt='filterIcon' />}

        {column.filterable && (
          <Popover isOpen={showPopover} setIsOpen={setShowPopover} />
        )}
      </div>
    </th>
  );
};
