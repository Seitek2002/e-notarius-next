import { forwardRef } from 'react';
import clsx from 'clsx';

import { CheckboxProps } from '../types';

import './checkbox.css';

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, ...props }, ref) => {
    const id = `${props.name}-${props.value}`;

    return (
      <label className={clsx('input-checkbox', { error })} htmlFor={id}>
        <input ref={ref} type='checkbox' id={id} {...props} />
        <span>{label}</span>
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
