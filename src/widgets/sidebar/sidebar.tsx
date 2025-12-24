'use client';

import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import NavItem from '@/shared/ui/Nav/nav-item';

import logo from '@assets/icons/logo.svg';
import arrow from '@assets/icons/nav/arrow.svg';
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
            <Image src={logo} alt='logo' />
            <span>E-notariat</span>
          </Link>
        </div>
        <div className='sidebar__toggler'>
          <Image src={arrow} alt='' />
        </div>
      </div>
      <div className='sidebar__owner'>
        <h2>Личный кабинет</h2>
        {navs.map((item) => (
          <NavItem
            key={item.path}
            path={item.path}
            label={item.label}
            icon={item.icon}
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
            icon={item.icon}
            active={pathname === item.path}
          />
        ))}
      </div>
      <hr className='my-5' />
      <NavItem
        icon={logout}
        label='Выход с кабинета'
        path='/'
        active={pathname === '/'}
      />
    </div>
  );
};

export default Sidebar;
