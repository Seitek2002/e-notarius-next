export type TableRowBase = {
  id: string | number;
};

export type Column<T extends TableRowBase> = {
  key: keyof T;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: number; // фикс
  minWidth?: number; // минимальная ширина
  align?: 'left' | 'center' | 'right';
  render?: (value: T[keyof T], row: T) => React.ReactNode;
};

export type Application = {
  key?: string;
  id: number;
  qr: string;
  registryNumber: string;
  notarialAction: string;
  status: string; //'active' | 'cancelled'
  createDate: string;
  notary: string;
  actionType: string;
  documentType: string;
  cancelDate: string;
  fee: string;
  reason: string;
};

export type Files = {
  key?: string;
  id: number;
  checkbox: boolean;
  fileName: string;
  dateOfUpload: string;
  fileSize: string;
  fileFormat: string;
};
