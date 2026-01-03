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

  // Общие стили padding (из th/td в CSS)
  const cellPadding = 'px-4 py-6';

  if (column.key === 'checkbox') {
    return (
      <td className={cellPadding}>
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
      <td className={`sticky right-0 z-20 ${cellPadding}`}>
        {/* Контейнер иконок: скрыт по умолчанию, показывается при group-hover (наведение на tr) */}
        <div className='flex gap-5 bg-white mt-px opacity-0 pointer-events-none transition-opacity duration-200 group-hover:opacity-100 group-hover:pointer-events-auto'>
          {renderRowActions(row)}
        </div>
      </td>
    );
  }

  return (
    <td
      className={cellPadding}
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
