import { Table } from '@/shared/ui/Table';
import { columns, data } from '@/widgets/table/applications/config';

import './style.css';

export const ApplicationsTable = () => {
  return (
    <div className='applications-table'>
      <Table columns={columns} data={data} />
    </div>
  );
};
