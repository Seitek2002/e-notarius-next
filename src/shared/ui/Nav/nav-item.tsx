import { FC } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

type NavItemProps = {
  path: string;
  label: string;
  Icon: FC;
  active: boolean;
  hidden?: boolean;
};

const NavItem: FC<NavItemProps> = ({ path, label, Icon, active, hidden }) => {
  return (
    <Link
      href={path}
      className={clsx(
        'flex items-center gap-[15px] py-3 px-4.5 text-white text-[16px] font-semibold transition-colors',
        active && 'bg-dark-blue',
        'hover:bg-dark-blue active:bg-dark-blue'
      )}
    >
      <Icon />
      <span className={clsx({ hidden: hidden })}>{label}</span>
    </Link>
  );
};

export default NavItem;
