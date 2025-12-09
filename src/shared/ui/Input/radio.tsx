import { FC } from 'react';
import clsx from 'clsx';

import { TPropsRadio } from '../types';

import './style.css';

const Radio: FC<TPropsRadio> = ({ label, error, ...props }) => {
  const id = `${props.name}-${props.value}`;

  return (
    <label className={clsx('input-radio', { error })} htmlFor={id}>
      <input type='radio' id={id} {...props} />
      <span>{label}</span>
    </label>
  );
};

export default Radio;
