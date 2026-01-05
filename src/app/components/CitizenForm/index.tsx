'use client';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Checkbox, Input, Radio } from '@/shared/ui/Input';
import Dropdown from '@/shared/ui/Dropdown/dropdown';
import { MultiFileUpload } from '@/features/application-wizard/ui';
import Button from '@/shared/ui/Button/button';
import { ApplicationsTable } from '@/widgets/table/applications';
import { FilesTable } from '@/widgets/table/files/ui';

import Arrow from '@assets/icons/arrow.svg';

const citizenSchema = z.object({
  lastName: z.string().min(1, 'Введите фамилию'),
  firstName: z.string().min(1, 'Введите имя'),
  middleName: z.string().min(1, 'Введите отчество'),
  inn: z
    .string()
    .min(14, 'ИНН должен состоять из 14 цифр') // Поправил на 14 (было 10 в min)
    .regex(/^\d+$/, 'ИНН должен содержать только цифры'),
  personType: z.enum(['individual', 'legalEntity']), // Добавил enum для радиокнопок
  region: z.string().min(1, 'Выберите область'),
  foreigner: z.boolean().optional(), // Добавил чекбокс
  // files пока оставим any, это отдельная тема с FileList
  files: z.any().optional(),
  documents: z
    .array(
      z.object({
        file: z
          .custom<FileList>() // RHF возвращает FileList
          .refine((files) => files?.length > 0, 'Загрузите файл'), // Проверка, что файл выбран
      })
    )
    .min(1, 'Добавьте хотя бы один документ'),
});

type CitizenFormValues = z.infer<typeof citizenSchema>;

const fields = [
  { name: 'lastName', label: 'Фамилия', type: 'input' },
  { name: 'firstName', label: 'Имя', type: 'input' },
  { name: 'middleName', label: 'Отчество', type: 'input' },
  { name: 'inn', label: 'ИНН', type: 'input' },
] as const;

const CitizenForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CitizenFormValues>({
    resolver: zodResolver(citizenSchema),
    defaultValues: {
      personType: 'individual', // Значение по умолчанию для радио
      foreigner: false,
      region: '',
      documents: [{ file: undefined }],
    },
  });

  const onSubmit = (data: CitizenFormValues) => {
    console.log('VALID DATA SUBMITTED:', data);
    // Тут будет запрос к API
  };

  return (
    <>
      <ApplicationsTable />
      <FilesTable />
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field) => (
          <Input
            key={field.name}
            label={field.label}
            error={errors[field.name]?.message}
            {...register(field.name)}
          />
        ))}

        <div className='flex gap-4'>
          <Radio
            label='Физическое лицо'
            value='individual'
            {...register('personType')}
          />
          <Radio
            label='Юридическое лицо'
            value='legalEntity'
            {...register('personType')}
          />
        </div>

        <Controller
          name='region'
          control={control}
          render={({ field: { onChange, value } }) => (
            <Dropdown
              label='Область'
              options={['Чуй', 'Нарын', 'Талас', 'Баткен', 'Джалал-Абад', 'Ош']}
              value={value}
              name='region'
              onChange={onChange}
              error={errors.region?.message}
              searchable
              required
            />
          )}
        />

        <Checkbox label='Иностранное лицо' {...register('foreigner')} />
        <MultiFileUpload<CitizenFormValues>
          control={control}
          register={register}
          errors={errors}
          name='documents' // Имя поля в схеме
        />
        <Button type='submit' loading={isSubmitting}>
          <span>Подтвердить</span>
          <Arrow />
        </Button>
      </form>
    </>
  );
};

export default CitizenForm;
