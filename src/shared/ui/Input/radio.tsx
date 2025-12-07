import { FC } from 'react';

import { TPropsRadio } from '../types';

import './style.css';

const Radio: FC<TPropsRadio> = ({ label, name, value, errors }) => {
  const id = `${name}-${value}`;

  return (
    <label
      className={errors ? 'input-radio error' : 'input-radio'}
      htmlFor={id}
    >
      <input type='radio' id={id} name={name} value={value} />
      <span>{label}</span>
      {errors && <p className='error'>{errors}</p>}
    </label>
  );
};

export default Radio;
