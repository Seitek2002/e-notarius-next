import { Application, Column } from '@/widgets/table/applications/model';

export const TableHeaderCell = ({
  column,
}: {
  column: Column<Application>;
}) => {
  return (
    <th
      style={{
        width: column.width,
        minWidth: column.minWidth,
        textAlign: column.align ?? 'left',
      }}
    >
      {column.label}
    </th>
  );
};
