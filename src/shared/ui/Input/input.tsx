import { forwardRef } from 'react';
import clsx from 'clsx';

import { InputProps } from '../types';

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, type = 'text', className, ...props }, ref) => {
    const id = props.id ?? props.name;

    const inputClasses = clsx(
      'border border-main-green text-light-blue outline-none py-3 px-2.5',
      'focus:border-main-green focus:ring-2 focus:ring-main-green/30',
      error && 'border-red'
    );

    return (
      <label
        className={clsx('flex flex-col text-[14px] space-y-1.5', className)}
        htmlFor={id}
      >
        {label && <span className='text-light-blue font-medium'>{label}</span>}
        <input
          ref={ref}
          type={type}
          id={id}
          className={inputClasses}
          {...props}
        />
        {error && <p className='text-red-500 text-[12px]'>{error}</p>}
      </label>
    );
  }
);

Input.displayName = 'Input';

export default Input;
