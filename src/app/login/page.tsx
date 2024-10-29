'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const Page = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      const response = await fetch('http://localhost:3000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      if (!response.ok) {
        throw new Error('การลงชื่อเข้าใช้ล้มเหลว');
      }

      const data = await response.json();
      console.log('ลงชื่อเข้าใช้สำเร็จ:', data);

      localStorage.setItem('token', data.token);

      router.push('/home');
    } catch (error) {
      const errorMessage = (error as Error).message || 'เกิดข้อผิดพลาด';
      console.error('เกิดข้อผิดพลาดระหว่างการลงชื่อเข้าใช้:', errorMessage);
      setError(errorMessage);
    }
  };

  return (
    <div className='flex flex-col md:flex-row-reverse h-screen bg-green-500'>
      <div className='bg-green-300 w-full md:w-[45%] flex items-center justify-center rounded-bl-[36px] rounded-br-[36px]'>
        <div className='flex flex-col items-center'>
          <Image
            src='/loginpic.png'
            alt='Login Image'
            width={171.46}
            height={137.62}
          />
          <div className='text-white font-castoro italic text-[24px] mt-[24.68px]'>
            a Board
          </div>
        </div>
      </div>
      <div className='bg-green-500 w-full md:w-[55%] flex-1 flex items-center justify-center'>
        <div className='flex flex-col w-full mx-[16px] md:w-[384px] md:h-[178px]'>
          <div className='font-inter font-semibold text-white text-[28px] mb-[40px]'>
            Sign in
          </div>
          {error && <div className='text-red-500 mb-[20px]'>{error}</div>}{' '}
          <div className='flex flex-col gap-[20px]'>
            <input
              type='text'
              className='flex-grow w-full rounded-lg h-[44px] bg-white border-none outline-none text-black-110 px-[10px]'
              placeholder='Username'
              onChange={(e) => setUsername(e.target.value)}
            />
            <button
              className='bg-success rounded-lg h-[40px] font-ibm-plex-semibold-sm font-semibold text-white'
              onClick={handleSignIn}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
