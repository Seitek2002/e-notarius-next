'use client';

import {
  useFieldArray,
  Control,
  UseFormRegister,
  FieldErrors,
  FieldValues,
  ArrayPath,
  useWatch,
} from 'react-hook-form';

import { InputFile } from '@/shared/ui/Input';

import UploadOwnFilesIcon from '@assets/icons/files/upload-own-files-icon.svg';
import MinusIcon from '@assets/icons/files/upload-minus-icon.svg';
import PlusIcon from '@assets/icons/files/upload-plus-icon.svg';

// Типы для пропсов (принимаем всё нужное от RHF)
interface MultiFileUploadProps<T extends FieldValues> {
  control: Control<T>;
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  name: ArrayPath<T>;
}

const MultiFileUpload = <T extends FieldValues>({
  control,
  register,
  errors,
  name,
}: MultiFileUploadProps<T>) => {
  // useFieldArray - магия для динамических списков
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const values = useWatch({
    control,
    name: name as any,
  });

  return (
    <div>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-light-blue font-semibold text-base'>
          Файлы для загрузки
        </h2>
        <button
          type='button'
          className='flex items-center gap-1.5 text-main-green cursor-pointer'
        >
          <UploadOwnFilesIcon />
          <span>Выбрать из моих файлов</span>
        </button>
      </div>

      <div className='flex flex-col gap-4'>
        {fields.map((field, index) => {
          const fieldError = (errors?.[name] as any)?.[index]?.file?.message as
            | string
            | undefined;

          const currentFile = (values as any)?.[index]?.file;
          let fileName = 'Выберите файл';

          // Проверка: это FileList (из инпута) или уже File (если мы как-то иначе добавили)
          if (currentFile && currentFile.length > 0) {
            fileName = currentFile[0].name;
          }

          return (
            <div key={field.id} className='flex gap-2.5 items-start'>
              <InputFile
                label={fileName}
                {...register(`${name}.${index}.file` as any)}
                error={fieldError}
                className='flex-1'
              />

              {index === fields.length - 1 ? (
                <button
                  type='button'
                  onClick={() => append({ file: null } as any)}
                  className='w-11 h-[42px] flex items-center justify-center bg-main-green cursor-pointer'
                >
                  <PlusIcon />
                </button>
              ) : (
                <button
                  type='button'
                  onClick={() => remove(index)}
                  className='w-11 h-[42px] flex items-center justify-center bg-light-blue cursor-pointer'
                >
                  <MinusIcon />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MultiFileUpload;
