import Sidebar from '@/widgets/sidebar/sidebar';
import Header from '@/widgets/header/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex w-full min-h-screen'>
      <Sidebar />
      <div className='flex-1 min-w-0 px-5 lg:px-10'>
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
}
