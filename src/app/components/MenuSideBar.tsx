'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface MenuSideBarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const MenuSideBar: React.FC<MenuSideBarProps> = ({ isOpen, toggleSidebar }) => {
  const pathname = usePathname();
  const isHome = pathname === '/home';
  const isOurBlog = pathname === '/ourblog';

  return (
    <div
      className={`fixed top-0 right-0 h-full w-[280px] bg-green-500 rounded-l-xl transition-transform transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } z-50`}
    >
      {/* Sidebar Content */}
      <div className='mt-[32px]'>
        <div className='mb-[36px]'>
          <div className='text-green-100 justify-start py-[6px] px-[33px]'>
            <button onClick={toggleSidebar}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='size-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3'
                />
              </svg>
            </button>
          </div>
        </div>
        <div className='px-[16px]'>
          {/* Links */}
          <Link
            href='/home'
            className={`flex text-green-100 font-inter leading-[24px] gap-[12px] px-[12px] py-[8px]  ${
              isHome ? 'font-extrabold' : 'font-medium'
            } text-[16px]`}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='size-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
              />
            </svg>
            Home
          </Link>
          <Link
            href='/ourblog'
            className={`flex text-green-100 font-inter leading-[24px] gap-[12px] px-[12px] py-[8px] ${
              isOurBlog ? 'font-extrabold' : 'font-medium'
            } text-[16px]`}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='size-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10'
              />
            </svg>
            OurBlog
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MenuSideBar;
