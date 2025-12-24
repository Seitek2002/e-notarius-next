import { FC } from 'react';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import clsx from 'clsx';

import './style.css';

type TProps = {
  path: string;
  label: string;
  icon: StaticImageData;
  active: boolean;
};

const NavItem: FC<TProps> = ({ path, label, icon, active }) => {
  return (
    <Link href={path} className={clsx('nav-item', { active })}>
      <Image src={icon} alt='nav-icon' />
      {label}
    </Link>
  );
};

export default NavItem;
