import { ReactNode } from 'react';

import { Column, TableRowBase } from '@/widgets/table/model';
import { Checkbox } from '../Input';

type TProps<T extends TableRowBase> = {
  column: Column<T>;
  row: T;
  renderRowActions?: (row: T) => ReactNode;
  isActions: boolean;

  selectedIds?: Array<T['id']>;
  onToggleRow?: (id: T['id']) => void;
};

export function TableCell<T extends TableRowBase>({
  column,
  row,
  renderRowActions,
  isActions,
  selectedIds,
  onToggleRow,
}: TProps<T>) {
  const value = row[column.key];

  if (column.key === 'checkbox') {
    return (
      <td>
        <Checkbox
          label=''
          name={row.id + ''}
          checked={selectedIds?.includes(row.id)}
          onChange={() => onToggleRow?.(row.id)}
        />
      </td>
    );
  }

  if (isActions && renderRowActions) {
    return (
      <td className='actions-cell'>
        <div className='icons'>{renderRowActions(row)}</div>
      </td>
    );
  }

  return (
    <td
      style={{
        width: column.width,
        minWidth: column.minWidth,
        textAlign: column.align ?? 'left',
      }}
    >
      {String(value ?? '')}
    </td>
  );
}
