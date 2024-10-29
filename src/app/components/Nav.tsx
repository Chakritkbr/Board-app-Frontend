'use client';
import { useState } from 'react';
import { MainButton } from './Button';
import MenuSideBar from './MenuSideBar';

export default function Header() {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className='relative flex flex-row justify-between items-center px-8 bg-green-500 text-white w-full h-[60px]'>
      <div className='font-castoro italic'>a Board</div>
      <div className='flex items-center'>
        <MainButton text='Sign In' />
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
