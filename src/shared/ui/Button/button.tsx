import { FC } from 'react';
import clsx from 'clsx';

import { TButton } from '../types';

import './style.css';

const Button: FC<TButton> = ({ children, loading, ...props }) => {
  return (
    <button className='button' {...props} disabled={props.disabled || loading}>
      <span className={clsx('content', { hidden: loading })}>{children}</span>
      {loading && <span className='spinner' />}
    </button>
  );
};

export default Button;
