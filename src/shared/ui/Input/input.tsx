import { FC } from 'react';

import { TPropsInput } from '../types';

import './style.css';

const Input: FC<TPropsInput> = ({
  label,
  name,
  errors,
  placeholder,
  type = 'text',
}) => {
  return (
    <label
      className={errors ? 'input-text error' : 'input-text'}
      htmlFor={name}
    >
      <span>{label}</span>
      <input type={type} id={name} name={name} placeholder={placeholder} />
      {errors && <p className='error'>{errors}</p>}
    </label>
  );
};

export default Input;
