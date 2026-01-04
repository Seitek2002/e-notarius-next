import { FC } from 'react';
import clsx from 'clsx';

import { CheckboxProps } from '../types';

import './checkbox.css';

const Checkbox: FC<CheckboxProps> = ({ label, error, ...props }) => {
  const id = `${props.name}-${props.value}`;

  return (
    <label className={clsx('input-checkbox', { error })} htmlFor={id}>
      <input type='checkbox' id={id} {...props} />
      <span>{label}</span>
    </label>
  );
};

export default Checkbox;
