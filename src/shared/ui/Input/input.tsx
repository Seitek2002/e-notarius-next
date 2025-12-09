import { FC } from 'react';

import { TPropsInput } from '../types';

import './style.css';

const Input: FC<TPropsInput> = ({
  label,
  name,
  error,
  placeholder,
  type = 'text',
}) => {
  return (
    <label
      className={error ? 'input-text error' : 'input-text'}
      htmlFor={name}
    >
      <span>{label}</span>
      <input type={type} id={name} name={name} placeholder={placeholder} />
      {error && <p className='error'>{error}</p>}
    </label>
  );
};

export default Input;
