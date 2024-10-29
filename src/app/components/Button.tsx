'use client';

interface MainButtonProps {
  text: string;
  onClick?: () => void; // เพิ่ม onClick prop ที่นี่
}

const MainButton: React.FC<MainButtonProps> = ({ text, onClick }) => {
  return (
    <button className='hidden md:block bg-success text-white rounded-lg py-2.5 px-4 border-[1px] border-solid border-success w-[105px] relative leading-[20px] font-ibm-plex-semibold-sm font-semibold'>
      {text}
    </button>
  );
};

export default MainButton;
