import { FC } from 'react';
import { TableCell } from './table-cell';
import { Application, Column } from '@/widgets/table/applications/model';

import DetailsIcon from '@assets/icons/table/details-icon.svg';
import EditIcon from '@assets/icons/table/edit-icon.svg';
import DownloadIcon from '@assets/icons/table/download-icon.svg';
import DeleteIcon from '@assets/icons/table/delete-icon.svg';

type TProps = {
  columns: Column<Application>[];
  data: Application[];
};

export const TableBody: FC<TProps> = ({ columns, data }) => {
  return (
    <tbody>
      {data.map((row) => (
        <tr key={row.id}>
          {columns.map((column) => (
            <TableCell key={column.key} column={column} row={row} />
          ))}
          <td className='icons'>
            <DetailsIcon />
            <EditIcon />
            <DownloadIcon />
            <DeleteIcon />
          </td>
        </tr>
      ))}
    </tbody>
  );
};
