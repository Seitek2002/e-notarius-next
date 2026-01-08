'use client';

import { FC } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

import { useSidebar } from '@/shared/model/use-sidebar';

import NavItem from '@/shared/ui/Nav/nav-item';

import Logo from '@assets/icons/logo.svg';
import Arrow from '@assets/icons/nav/arrow.svg';
import logout from '@assets/icons/nav/logout.svg';

import { navs, publicNavs } from './model/navigation';

const Sidebar: FC = () => {
  const pathname = usePathname();
  const { isOpen, toggle } = useSidebar();

  return (
    <aside
      className={clsx(
        'text-white bg-main-green fixed z-50 top-0 left-0 max-h-screen lg:sticky overflow-y-auto lg:min-h-screen w-full shrink-0 py-[50px] box-border',
        { 'block lg:w-[280px]': isOpen },
        { 'hidden lg:block lg:w-[74px]': !isOpen }
      )}
    >
      <div
        className={clsx('bg-[#6fcf97] p-2.5 cursor-pointer size-11 mx-auto', {
          hidden: isOpen,
        })}
        onClick={toggle}
      >
        <Arrow />
      </div>
      <div
        className={clsx('flex items-center mb-10', {
          'px-5 justify-between': isOpen,
          'justify-center mt-5': !isOpen,
        })}
      >
        <div className='uppercase font-bold text-[16px]'>
          <Link href='/' className='flex items-center gap-2.5'>
            <Logo />
            <span className={clsx({ hidden: !isOpen })}>E-notariat</span>
          </Link>
        </div>
        <div
          className={clsx('bg-[#6fcf97] p-2.5 cursor-pointer', {
            hidden: !isOpen,
          })}
          onClick={toggle}
        >
          <Arrow />
        </div>
      </div>
      <div className='font-bold text-[18px] mb-[15px]'>
        <h2 className={clsx({ hidden: !isOpen })}>Личный кабинет</h2>
        {navs.map((item) => (
          <NavItem
            key={item.path}
            path={item.path}
            label={item.label}
            Icon={item.icon}
            active={pathname.startsWith(item.path)}
            hidden={!isOpen}
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
            hidden={!isOpen}
          />
        ))}
      </div>
      <hr className='my-5' />
      <NavItem
        Icon={logout}
        label='Выход с кабинета'
        path='/'
        active={pathname === '/'}
        hidden={!isOpen}
      />
    </aside>
  );
};

export default Sidebar;
