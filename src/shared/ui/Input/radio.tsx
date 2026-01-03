import { FC } from 'react';
import clsx from 'clsx';

import { TPropsRadio } from '../types';

const Radio: FC<TPropsRadio> = ({ label, error, className, ...props }) => {
  const id = props.id ?? `${props.name}-${props.value}`;

  return (
    <label
      className={clsx('flex items-center gap-2 cursor-pointer py-1', className)}
      htmlFor={id}
    >
      <span className='relative inline-grid place-items-center'>
        <input
          type='radio'
          id={id}
          className={clsx(
            'peer appearance-none w-[13px] h-[13px] rounded-full bg-white cursor-pointer align-middle',
            'border transition-shadow',
            error ? 'border-red' : 'border-main-green',
            'focus-visible:outline-none'
          )}
          {...props}
        />
        {/* Focus halo (always round) */}
        <span className='pointer-events-none absolute -inset-[3px] rounded-full ring-2 ring-main-green/40 opacity-0 peer-focus-visible:opacity-100' />
        {/* Inner green dot with white ring when checked */}
        <span className='pointer-events-none absolute size-2.5 rounded-full bg-main-green border border-white opacity-0 scale-0 transition-transform duration-200 peer-checked:opacity-100 peer-checked:scale-100' />
      </span>
      <span>{label}</span>
    </label>
  );
};

export default Radio;
