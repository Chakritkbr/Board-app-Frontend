'use client';
import { useState } from 'react';

const options = [
  'History',
  'Food',
  'Pets',
  'Health',
  'Fashion',
  'Exercise',
  'Others',
];

export const CommuDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>('Community');

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option); // Update the selected option
    setIsOpen(false); // Close the dropdown after selecting an option
  };

  return (
    <div className='flex justify-center items-center'>
      <div className='relative inline-block text-left'>
        <button
          onMouseDown={toggleDropdown} // Use onMouseDown to avoid focus
          className='flex items-center justify-center text-[#191919] px-4 py-1 rounded font-ibm-plex-semibold-sm font-semibold text-sm leading-sm'
          style={{ outline: 'none' }}
          tabIndex={-1} // Prevent focus on button
        >
          {selectedOption}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='h-6 w-6 ml-1'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='m19.5 8.25-7.5 7.5-7.5-7.5'
            />
          </svg>
        </button>

        {isOpen && (
          <div className='absolute right-0 mt-2 w:[202px] h:[316px] md:w-[320px] md:h-[316px] bg-white border border-gray-300 rounded-md shadow-lg z-10'>
            <ul className='py-1'>
              {options.map((option) => (
                <li
                  key={option}
                  className='flex items-center justify-between w-[202px] h-[44px] md:w-[320px] md:h-[44px] px-4 text-[16px] text-gray-700 font-medium hover:bg-green-100 cursor-pointer group'
                  onClick={() => handleOptionClick(option)}
                  tabIndex={-1} // Prevent focus on this element
                  style={{ outline: 'none' }} // Disable focus outline
                >
                  {option}
                  <span className='ml-2 hidden group-hover:block'>
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
                        d='m4.5 12.75 6 6 9-13.5'
                      />
                    </svg>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
