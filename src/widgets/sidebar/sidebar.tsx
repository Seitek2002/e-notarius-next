'use client';

import { FC } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import NavItem from '@/shared/ui/Nav/nav-item';

import Logo from '@assets/icons/logo.svg';
import Arrow from '@assets/icons/nav/arrow.svg';
import logout from '@assets/icons/nav/logout.svg';

import { navs, publicNavs } from './model/navigation';

import './style.css';

const Sidebar: FC = () => {
  const pathname = usePathname();

  return (
    <div className='sidebar'>
      <div className='sidebar__top'>
        <div className='sidebar__logo'>
          <Link href='/'>
            <Logo />
            <span>E-notariat</span>
          </Link>
        </div>
        <div className='sidebar__toggler'>
          <Arrow />
        </div>
      </div>
      <div className='sidebar__owner'>
        <h2>Личный кабинет</h2>
        {navs.map((item) => (
          <NavItem
            key={item.path}
            path={item.path}
            label={item.label}
            Icon={item.icon}
            active={pathname === item.path}
          />
        ))}
      </div>
      <hr className='my-5' />
      <div className='sidebar__public'>
        {publicNavs.map((item) => (
          <NavItem
            key={item.path}
            path={item.path}
            label={item.label}
            Icon={item.icon}
            active={pathname === item.path}
          />
        ))}
      </div>
      <hr className='my-5' />
      <NavItem
        Icon={logout}
        label='Выход с кабинета'
        path='/'
        active={pathname === '/'}
      />
    </div>
  );
};

export default Sidebar;
