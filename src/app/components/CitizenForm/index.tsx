'use client';

import { FormEvent, useState } from 'react';
import * as z from 'zod';

import { Checkbox, Input, InputFile, Radio } from '@/shared/ui/Input';
import Dropdown from '@/shared/ui/Dropdown/dropdown';

const citizenSchema = z.object({
  lastName: z.string().min(1, 'Введите фамилию'),
  firstName: z.string().min(1, 'Введите имя'),
  middleName: z.string().min(1, 'Введите отчество'),
  inn: z
    .string()
    .min(10, 'ИНН должен состоять из 14 цифр')
    .regex(/^\d+$/, 'ИНН должен содержать только цифры'),

  region: z.string().min(1, 'Выберите область'),
});

const fields = [
  {
    name: 'lastName',
    label: 'Фамилия',
    type: 'input',
  },
  {
    name: 'firstName',
    label: 'Имя',
    type: 'input',
  },
  {
    name: 'middleName',
    label: 'Отчество',
    type: 'input',
  },
  {
    name: 'inn',
    label: 'ИНН',
    type: 'input',
  },
  {
    name: 'personType',
    label: 'Физическое лицо',
    value: 'individual',
    type: 'radio',
  },
  {
    name: 'personType',
    label: 'Юридическое лицо',
    value: 'legalEntity',
    type: 'radio',
  },
];

const CitizenForm = () => {
  const [region, setRegion] = useState<string | null>('');
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const rawData = {
      ...fields.reduce((acc, field) => {
        acc[field.name] = formData.get(field.name);
        return acc;
      }, {} as Record<string, FormDataEntryValue | null>),
      region,
    };

    const res = citizenSchema.safeParse(rawData);

    if (!res.success) {
      const fieldErrors = res.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    console.log('VALID DATA:', res.data);
  };

  return (
    <div className='px-10'>
      <form onSubmit={(e) => handleSubmit(e)}>
        {fields.map((field) => {
          if (field.type === 'input') {
            return (
              <Input
                key={field.name}
                label={field.label}
                name={field.name}
                error={errors[field.name]?.[0]}
              />
            );
          } else if (field.type === 'radio') {
            return (
              <Radio
                key={field.value}
                label={field.label}
                name={field.name}
                value={field.value}
              />
            );
          }
        })}
        <Dropdown
          name='region'
          label='Область'
          value={region}
          onChange={(newValue) => setRegion(newValue)}
          options={['Чуй', 'Нарын', 'Талас', 'Баткен', 'Джалал-Абад', 'Ош']}
          searchable
          required
        />
        <Checkbox label='Иностранное лицо' name='foreigner' />
        <InputFile />
        <button type='submit'>Отправить</button>
      </form>
    </div>
  );
};

export default CitizenForm;
