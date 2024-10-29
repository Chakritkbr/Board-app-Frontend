'use client';

interface MainButtonProps {
  text: string;
}

export const MainButton: React.FC<MainButtonProps> = ({ text }) => {
  return (
    <button className='hidden md:block bg-success text-white rounded-lg py-2.5 px-4 border-[1px] border-solid border-success w-[105px] relative leading-[20px] font-ibm-plex-semibold-sm font-semibold'>
      {text}
    </button>
  );
};
