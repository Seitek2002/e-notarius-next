import { forwardRef } from 'react';
import clsx from 'clsx';

import { CheckboxProps } from '../types';

import s from './checkbox.module.css';

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <div>
        <label className={clsx(s.inputCheckbox, { error })} htmlFor={props.id}>
          <input ref={ref} type='checkbox' id={props.id} {...props} />
          <span>{label}</span>
        </label>
        {error && (
          <p className='mt-1 text-xs text-red-500 animate-fadeIn'>{error}</p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
