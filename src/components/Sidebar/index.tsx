'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Settings, Tv } from 'lucide-react';
import React from 'react';

const SideBar = () => {
  const pathname = usePathname();

  return (
    <aside className="hidden sm:block lg:block xs:hidden lg:w-20   p-1">
      {/* Internal Sidebar for large screens */}
      <div className="flex flex-col h-screen w-16 lg:w-16 ">
        <nav className="flex flex-col space-y-4 text-sm mt-4 lg:mt-0">
          <Link href="/" passHref>
            <div
              className={`hover:bg-base-300 hover:text-secondary rounded-md p-4 flex flex-col items-center ${pathname === '/' ? 'bg-base-300 text-secondary' : ''
                }`}
            >
              <Home size={24} />
              <span>Home</span>
            </div>
          </Link>
          <Link href="/tv" passHref>
            <div
              className={`hover:bg-base-300 hover:text-secondary rounded-md p-4 flex flex-col items-center ${pathname === '/tv' ? 'bg-base-300 text-secondary' : ''
                }`}
            >
              <Tv size={24} />
              <span>TV</span>
            </div>
          </Link>
          <Link href="/settings" passHref>
            <div
              className={`hover:bg-base-300 hover:text-secondary rounded-md p-4 flex flex-col items-center ${pathname === '/settings' ? 'bg-base-300 text-secondary' : ''
                }`}
            >
              <Settings size={24} />
              <span>Settings</span>
            </div>
          </Link>
        </nav>
      </div>
    </aside>
  );
};

export default SideBar;