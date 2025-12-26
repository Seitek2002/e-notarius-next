import { FC } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

import './style.css';

type TProps = {
  path: string;
  label: string;
  Icon: FC;
  active: boolean;
};

const NavItem: FC<TProps> = ({ path, label, Icon, active }) => {
  return (
    <Link href={path} className={clsx('nav-item', { active })}>
      <Icon />
      {label}
    </Link>
  );
};

export default NavItem;
