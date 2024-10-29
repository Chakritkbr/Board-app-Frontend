'use client';

import './globals.css';
import Header from './components/Nav';
import SideBar from './components/SideBar';
import { usePathname } from 'next/navigation';
import { metadata } from './metadata';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  return (
    <html lang='en'>
      <head>
        <title>{String(metadata.title ?? '')}</title>
        <meta name='description' content={String(metadata.description ?? '')} />
      </head>
      <body className='antialiased'>
        {!isLoginPage && <Header />}
        <div
          className={`bg-grey-100 min-h-screen flex ${
            isLoginPage ? 'justify-center items-center' : ''
          }`}
        >
          {!isLoginPage && <SideBar />}
          <div
            className={`${
              isLoginPage ? 'w-full' : 'flex-grow md:mx-[40.42px] mx-[16px]'
            }`}
          >
            {children}
          </div>
          {!isLoginPage && (
            <div className='hidden 2xl:flex justify-center w-[280px] items-center'></div>
          )}
        </div>
      </body>
    </html>
  );
}
