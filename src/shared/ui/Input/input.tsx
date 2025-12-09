import { FC } from 'react';
import clsx from 'clsx';

import { TPropsInput } from '../types';

import './style.css';

const Input: FC<TPropsInput> = ({ label, error, type = 'text', ...props }) => {
  const id = props.id ?? props.name;

  return (
    <label className={clsx('input-text', { error })} htmlFor={id}>
      {label && <span>{label}</span>}
      <input type={type} id={id} {...props} />
      {error && <p className='error'>{error}</p>}
    </label>
  );
};

export default Input;
