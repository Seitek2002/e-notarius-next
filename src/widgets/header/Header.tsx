import DefaultAvatar from '@assets/icons/header/default-avatar.svg';
import ArrowIcon from '@assets/icons/header/arrow.svg';
import NotificationIcon from '@assets/icons/header/notification.svg';

const Header = () => {
  return (
    <header className='header'>
      <h2>Заявки</h2>
      <div className='header__right'>
        <div className='header__user'>
          <DefaultAvatar />
          <span>ЧН Абылгазиева Нурмира Нарматовна</span>
          <ArrowIcon />
        </div>
        <div className='header__notification'>
          <NotificationIcon />
        </div>
        <div className='header__lang'>
          <span>РУС</span>
          <ArrowIcon />
        </div>
      </div>
    </header>
  );
};

export default Header;
