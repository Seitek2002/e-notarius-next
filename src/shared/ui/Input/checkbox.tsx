import { FC } from 'react';
import clsx from 'clsx';

import { TPropsCheckbox } from '../types';

import './style.css';

const Checkbox: FC<TPropsCheckbox> = ({ label, error, ...props }) => {
  const id = `${props.name}-${props.value}`;

  return (
    <label className={clsx('input-checkbox', { error })} htmlFor={id}>
      <input type='checkbox' id={id} {...props} />
      <span>{label}</span>
    </label>
  );
};

export default Checkbox;
