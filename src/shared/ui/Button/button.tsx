import { FC } from 'react';
import clsx from 'clsx';

import { ButtonProps } from '../types';

const Button: FC<ButtonProps> = ({ children, loading, className, ...props }) => {
  const base =
    'relative inline-flex items-center justify-center h-11 px-6 min-w-[240px] ' +
    'bg-main-green text-pure-white font-semibold text-[16px] transition-shadow ' +
    'enabled:hover:shadow-[0_10px_20px_0_#99dbaf] disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <button
      className={clsx(base, className)}
      {...props}
      disabled={props.disabled || loading}
    >
      <span className={clsx('inline-flex gap-2.5', { invisible: loading })}>
        {children}
      </span>
      {loading && (
        <span
          className={
            'absolute inset-0 m-auto size-6 rounded-full border-2 border-white/40 border-t-white ' +
            'animate-spin'
          }
        />
      )}
    </button>
  );
};

export default Button;
