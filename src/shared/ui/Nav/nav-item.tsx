import { FC } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

type TProps = {
  path: string;
  label: string;
  Icon: FC;
  active: boolean;
};

const NavItem: FC<TProps> = ({ path, label, Icon, active }) => {
  return (
    <Link
      href={path}
      className={clsx(
        'flex items-center gap-[15px] py-3 px-5 text-white text-[16px] font-semibold transition-colors',
        active && 'bg-dark-blue',
        'hover:bg-dark-blue active:bg-dark-blue'
      )}
    >
      <Icon />
      {label}
    </Link>
  );
};

export default NavItem;
