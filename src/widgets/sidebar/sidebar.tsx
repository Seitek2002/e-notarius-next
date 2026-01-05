'use client';

import { FC } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import NavItem from '@/shared/ui/Nav/nav-item';

import Logo from '@assets/icons/logo.svg';
import Arrow from '@assets/icons/nav/arrow.svg';
import logout from '@assets/icons/nav/logout.svg';

import { navs, publicNavs } from './model/navigation';

const Sidebar: FC = () => {
  const pathname = usePathname();

  return (
    <aside className='text-white bg-main-green min-h-screen w-[280px] shrink-0 py-[50px] box-border'>
      <div className='flex items-center justify-between mb-10 px-5'>
        <div className='uppercase font-bold text-[16px]'>
          <Link href='/'>
            <Logo />
            <span>E-notariat</span>
          </Link>
        </div>
        <div className='bg-[#6fcf97] p-2.5 cursor-pointer'>
          <Arrow />
        </div>
      </div>
      <div className='font-bold text-[18px] mb-[15px]'>
        <h2 className='ml-[25px]'>Личный кабинет</h2>
        {navs.map((item) => (
          <NavItem
            key={item.path}
            path={item.path}
            label={item.label}
            Icon={item.icon}
            active={pathname.startsWith(item.path)}
          />
        ))}
      </div>
      <hr className='my-5' />
      <div>
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
    </aside>
  );
};

export default Sidebar;
