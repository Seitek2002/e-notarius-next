import DefaultAvatar from '@assets/icons/header/default-avatar.svg';
import ArrowIcon from '@assets/icons/header/arrow.svg';
import NotificationIcon from '@assets/icons/header/notification.svg';

const Header = () => {
  return (
    <header className='flex items-center justify-between py-6'>
      <h2 className='text-main-green font-semibold text-[24px]'>Заявки</h2>
      <div className='flex items-center gap-[30px] text-[16px] text-dark-blue'>
        <div className='flex items-center gap-2 font-medium cursor-pointer'>
          <DefaultAvatar />
          <span>ЧН Абылгазиева Нурмира Нарматовна</span>
          <ArrowIcon />
        </div>
        <div className='cursor-pointer'>
          <NotificationIcon />
        </div>
        <div className='flex items-center cursor-pointer'>
          <span>РУС</span>
          <ArrowIcon />
        </div>
      </div>
    </header>
  );
};

export default Header;
