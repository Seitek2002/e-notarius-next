'use client';

import { usePathname } from 'next/navigation';

import { useSidebar } from '@/shared/model/use-sidebar';

import { navs, publicNavs } from '../sidebar/model/navigation';

import DefaultAvatar from '@assets/icons/header/default-avatar.svg';
import ArrowIcon from '@assets/icons/header/arrow.svg';
import NotificationIcon from '@assets/icons/header/notification.svg';
import SidebarArrow from '@assets/icons/nav/arrow.svg';

const Header = () => {
  const pathname = usePathname();
  const toggleSidebar = useSidebar((state) => state.toggle);

  const pageTitle =
    [...navs, ...publicNavs].find((n) => n.path === pathname)?.label ||
    'Заявки';

  return (
    <header className='flex items-center justify-between py-6'>
      <h2 className='text-main-green font-semibold text-[24px]'>
        <span className=' hidden lg:block'>{pageTitle}</span>
        <div
          onClick={toggleSidebar}
          className='bg-white p-2.5 cursor-pointer rotate-180 lg:hidden'
        >
          <SidebarArrow className='[&>path]:stroke-[black]' />
        </div>
      </h2>
      <div className='flex items-center gap-[30px] text-[16px] text-dark-blue'>
        <div className='flex items-center gap-2 font-medium cursor-pointer'>
          <DefaultAvatar />
          <span className='hidden lg:block'>
            ЧН Абылгазиева Нурмира Нарматовна
          </span>
          <ArrowIcon />
        </div>
        <div className='cursor-pointer'>
          <NotificationIcon />
        </div>
        <div className='hidden items-center cursor-pointer lg:flex'>
          <span>РУС</span>
          <ArrowIcon />
        </div>
      </div>
    </header>
  );
};

export default Header;
