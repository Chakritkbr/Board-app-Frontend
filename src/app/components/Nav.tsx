'use client';
import { useState } from 'react';
import MainButton from './Button';
import MenuSideBar from './MenuSideBar';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Header() {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const router = useRouter(); //

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const handleSignIn = () => {
    router.push('/path/login');
  };

  return (
    <div className='relative flex flex-row justify-between items-center px-8 bg-green-500 text-white w-full h-[60px]'>
      <div className='font-castoro italic'>a Board</div>
      <div className='flex items-center'>
        <Link href='/login'>
          <button className='hidden md:block bg-success text-white rounded-lg py-2.5 px-4 border-[1px] border-solid border-success w-[105px] relative leading-[20px] font-ibm-plex-semibold-sm font-semibold'>
            Sign in
          </button>
        </Link>
        <div className='md:hidden rounded-lg overflow-hidden flex flex-row items-center justify-center p-2'>
          <button onClick={toggleSidebar}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <MenuSideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40'
        ></div>
      )}
    </div>
  );
}
