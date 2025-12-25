import Sidebar from '@/widgets/sidebar/sidebar';
import Header from '@/widgets/header/Header';

import './style.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex w-full'>
      <Sidebar />
      <div className='flex-1 min-w-0 px-5 lg:px-14'>
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
}
