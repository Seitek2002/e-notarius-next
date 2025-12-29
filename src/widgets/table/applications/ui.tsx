import { Table } from '@/shared/ui/Table';
import { applicationsColumns, applicationsData } from '@/widgets/table/config';

import DetailsIcon from '@assets/icons/table/details-icon.svg';
import EditIcon from '@assets/icons/table/edit-icon.svg';
import DownloadIcon from '@assets/icons/table/download-icon.svg';
import DeleteIcon from '@assets/icons/table/delete-icon.svg';

import './style.css';

export const ApplicationsTable = () => {
  return (
    <div className='applications-table'>
      <Table
        columns={applicationsColumns}
        data={applicationsData}
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        renderRowActions={(row) => (
          <>
            <DetailsIcon />
            <EditIcon />
            <DownloadIcon />
            <DeleteIcon />
          </>
        )}
      />
    </div>
  );
};
