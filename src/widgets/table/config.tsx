import { Application, Column, Files } from '@/widgets/table/model';
import { QrButton } from '../../shared/ui/Table/qr-button';
import { Checkbox } from '@/shared/ui/Input';

export const applicationsColumns: Column<Application>[] = [
  {
    key: 'qr',
    label: 'QR',
    render: (_, row) => <QrButton value={row.id + ''} />,
  },
  {
    key: 'id',
    label: 'ID',
    sortable: true,
  },
  {
    label: 'Номер реестра',
    key: 'registryNumber',
    sortable: true,
  },
  {
    label: 'Нотариальное действие',
    key: 'notarialAction',
    filterable: true,
  },
  {
    key: 'actionType',
    label: 'Вид действия',
    filterable: true,
  },
  {
    label: 'Вид документа',
    key: 'documentType',
    filterable: true,
  },
  {
    label: 'Нотариус',
    key: 'notary',
    sortable: true,
  },
  {
    key: 'status',
    label: 'Статус',
    filterable: true,
  },
  {
    key: 'createDate',
    label: 'Дата создания',
    sortable: true,
  },
  {
    key: 'cancelDate',
    label: 'Дата отмены',
    sortable: true,
  },
  {
    label: 'Пошлина',
    key: 'fee',
    sortable: true,
  },
  {
    label: 'Причина',
    key: 'reason',
    filterable: true,
  },
];

export const filesColumns: Column<Files>[] = [
  {
    key: 'checkbox',
    label: '', // Колонка для чекбокса, в заголовке обычно пустая или общий чекбокс
    render: (_, row) => <button>
      <Checkbox label='' name={row.fileName} />
    </button>,
  },
  {
    key: 'fileName',
    label: 'Наименование файла',
    sortable: true,
  },
  {
    key: 'dateOfUpload',
    label: 'Дата загрузки',
    sortable: true,
  },
  {
    key: 'fileSize',
    label: 'Размер',
    sortable: false,
  },
  {
    key: 'fileFormat',
    label: 'Формат',
    sortable: false,
  },
];

export const applicationsData: Application[] = [
  {
    id: 1,
    qr: 'qr-1',
    registryNumber: '125-0567',
    notarialAction: 'Удостоверение',
    actionType: 'Соглашение',
    documentType: 'Доверенность на получение з/п',
    notary: 'Ч/Н Асаналиев Асанакун Токторбаевич',
    status: 'Исполнен',
    createDate: '01.01.2022',
    cancelDate: '01.01.2022',
    fee: 'Освобожден',
    reason: '',
  },
  {
    id: 2,
    qr: 'qr-2',
    registryNumber: '125-0568',
    notarialAction: 'Свидетельствование',
    actionType: 'Договор',
    documentType:
      'Договор купли-продажи квартиры (жилого дома) с участием представителя',
    notary: 'Ч/Н Асаналиев Асанакун Токторбаевич',
    status: 'Исполнен',
    createDate: '01.01.2022',
    cancelDate: '01.01.2022',
    fee: 'Оплачен',
    reason: '',
  },
  {
    id: 3,
    qr: 'qr-3',
    registryNumber: '125-0569',
    notarialAction: 'Удостоверение',
    actionType: 'Доверенность',
    documentType: 'Доверенность на получение з/п',
    notary: 'Ч/Н Асаналиев Асанакун Токторбаевич',
    status: 'Отменен',
    createDate: '01.01.2022',
    cancelDate: '01.01.2022',
    fee: 'Оплачен',
    reason: 'Отказ клиента',
  },
  {
    id: 4,
    qr: 'qr-4',
    registryNumber: '125-0570',
    notarialAction: 'Принятие',
    actionType: 'Завещание',
    documentType: 'Доверенность',
    notary: 'Ч/Н Асаналиев Асанакун Токторбаевич',
    status: 'Исполнен',
    createDate: '01.01.2022',
    cancelDate: '01.01.2022',
    fee: 'Оплачен',
    reason: '',
  },
  {
    id: 5,
    qr: 'qr-5',
    registryNumber: '125-0571',
    notarialAction: 'Выдача',
    actionType: 'Свидетельство',
    documentType: 'Свидетельство о праве собственности',
    notary: 'Ч/Н Асаналиев Асанакун Токторбаевич',
    status: 'Исполнен',
    createDate: '01.01.2022',
    cancelDate: '01.01.2022',
    fee: 'Оплачен',
    reason: '',
  },
  {
    id: 6,
    qr: 'qr-6',
    registryNumber: '125-0572',
    notarialAction: 'Обеспечение доказательств',
    actionType: 'Постановление',
    documentType: 'Постановление о назначении экспертизы',
    notary: 'Ч/Н Асаналиев Асанакун Токторбаевич',
    status: 'Исполнен',
    createDate: '01.01.2022',
    cancelDate: '01.01.2022',
    fee: 'Оплачен',
    reason: '',
  },
  {
    id: 7,
    qr: 'qr-7',
    registryNumber: '125-0573',
    notarialAction: 'Представление на гос. регистрацию',
    actionType: 'Свидетельство',
    documentType: 'Движимое имущество',
    notary: 'Ч/Н Асаналиев Асанакун Токторбаевич',
    status: 'Исполнен',
    createDate: '01.01.2022',
    cancelDate: '01.01.2022',
    fee: 'Оплачен',
    reason: '',
  },
];

export const filesData: Files[] = [
  {
    id: 1,
    checkbox: true,
    fileName: 'Фото_для док.jpg',
    dateOfUpload: '21.01.2022',
    fileSize: '350 кб',
    fileFormat: 'jpg',
  },
  {
    id: 2,
    checkbox: true,
    fileName: 'Копия паспорта.jpg',
    dateOfUpload: '21.01.2022',
    fileSize: '1.2 мб',
    fileFormat: 'pdf',
  },
  {
    id: 3,
    checkbox: false,
    fileName: 'Свидетельство о браке.pdf',
    dateOfUpload: '21.01.2022',
    fileSize: '15 мб',
    fileFormat: 'pdf',
  },
  {
    id: 4,
    checkbox: false,
    fileName: 'Тех_паспорт.pdf',
    dateOfUpload: '21.01.2022',
    fileSize: '9 мб',
    fileFormat: 'png',
  },
  {
    id: 5,
    checkbox: false,
    fileName: 'Doc.png',
    dateOfUpload: '21.01.2022',
    fileSize: '132 кб',
    fileFormat: 'pdf',
  },
  {
    id: 6,
    checkbox: false,
    fileName: 'Движимое имущество.pdf',
    dateOfUpload: '21.01.2022',
    fileSize: '7.2 мб',
    fileFormat: '', // В последней строке формат не указан
  },
];