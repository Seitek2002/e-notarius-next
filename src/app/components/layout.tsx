import Image from 'next/image';

import Sidebar from '@/widgets/sidebar/sidebar';
import defaultAvatar from '@assets/icons/header/default-avatar.svg';
import arrowIcon from '@assets/icons/header/arrow.svg';
import notificationIcon from '@assets/icons/header/notification.svg';

import './style.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-1'>
        <header className='header'>
          <h2>Заявки</h2>
          <div className='header__right'>
            <div className='header__user'>
              <Image
                width={44}
                height={44}
                src={defaultAvatar}
                alt='defaultAvatar'
              />
              <span>ЧН Абылгазиева Нурмира Нарматовна</span>
              <Image src={arrowIcon} alt='arrowIcon' />
            </div>
            <div className='header__notification'>
              <Image src={notificationIcon} alt='notificationIcon' />
            </div>
            <div className='header__lang'>
              <span>РУС</span>
              <Image src={arrowIcon} alt='arrowIcon' />
            </div>
          </div>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}
