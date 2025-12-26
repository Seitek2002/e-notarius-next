import { FC } from 'react';

import { TPropsInputFile } from '../types';

import СlipIcon from '@assets/icons/files/clip-icon.svg';

import './style.css';

const inputFile: FC<TPropsInputFile> = ({ label, error, ...props }) => {
  const id = props.id ?? props.name;

  return (
    <label className='input-file' htmlFor={id}>
      <span>{label || 'Выберите файл'}</span>
      <input type='file' id={id} {...props} />
      <div className='input-file__icon'>
        <СlipIcon />
      </div>
      {error && <p className='error'>{error}</p>}
    </label>
  );
};

export default inputFile;
