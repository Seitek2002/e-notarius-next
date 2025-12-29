import { ReactNode } from 'react';

import { Column, TableRowBase } from '@/widgets/table/model';

type TProps<T extends TableRowBase> = {
  column: Column<T>;
  row: T;
  renderRowActions?: (row: T) => ReactNode;
  isActions: boolean;
};

export function TableCell<T extends TableRowBase>({ column, row, renderRowActions, isActions }: TProps<T>) {
  const value = row[column.key];

  if (isActions && renderRowActions) {
    return <td className='actions-cell'>
      <div className="icons">
        {renderRowActions(row)}
      </div>
    </td>;
  }

  return (
    <td
      style={{
        width: column.width,
        minWidth: column.minWidth,
        textAlign: column.align ?? 'left',
      }}
    >
      {column.render ? column.render(value, row) : String(value ?? '')}
    </td>
  );
}
