import { Table } from '@/shared/ui/Table';
import { filesColumns, filesData } from '@/widgets/table/config';

import DownloadIcon from '@assets/icons/table/download-icon.svg';
import DeleteIcon from '@assets/icons/table/delete-icon.svg';

import './style.css';

export const FilesTable = () => {
  return (
    <div className='applications-table'>
      <Table
        columns={filesColumns}
        data={filesData}
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        renderRowActions={(row) => (
          <>
            <DownloadIcon />
            <DeleteIcon />
          </>
        )}
      />
    </div>
  );
};
