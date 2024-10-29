'use client';
import { useState, useEffect } from 'react';
import { CommuDropdown } from './Dropdown';

interface SearchBarProps {
  setIsAddPostOpen: (open: boolean) => void; // เพิ่ม props นี้
}

export default function SearchBar({ setIsAddPostOpen }: SearchBarProps) {
  const [showInput, setShowInput] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(false);

  const toggleInput = () => {
    setShowInput((prev) => !prev);
  };

  // Effect to handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth >= 768);
    };

    // Initial check
    handleResize();

    // Event listener for resize
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='flex mb-4 justify-between md:flex-row md:justify-center items-center gap-2'>
      {/* Button to toggle input visibility on small screens */}
      {!showInput && (
        <div className='md:hidden flex flex-row'>
          <button onClick={toggleInput}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-[20px] w-[20px] font-bold'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
              />
            </svg>
          </button>
        </div>
      )}
      {/* Input field: Visible on medium screens and up, or when toggle button is clicked on small screens */}
      {(showInput || isWideScreen) && (
        <div className='flex max-w-[535px] w-full flex-row items-center text-grey-600 bg-grey-100 border-[1px] rounded-xl border-green-100 pr-5'>
          <button onClick={toggleInput}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-6 w-6 m-2'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
              />
            </svg>
          </button>
          <input
            type='text'
            className='flex-grow w-full bg-grey-100 border-none outline-none text-black-110 px-[10px]'
            placeholder='Search'
          />
        </div>
      )}

      {/* Other buttons: Only visible if showInput is false */}
      {(!showInput || isWideScreen) && (
        <div className='flex gap-2'>
          <CommuDropdown />

          <button
            onClick={() => setIsAddPostOpen(true)} // เปิดโมดัลเมื่อคลิกปุ่ม
            className='bg-success text-white rounded-lg py-2.5 px-4 border-[1px] border-solid border-success w-[105px] mt-4'
          >
            Create +
          </button>
        </div>
      )}
    </div>
  );
}
