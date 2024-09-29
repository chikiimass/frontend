'use client';
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import ExternalSidebar from '@/components/Sidebar/ExternalSidebar';
import { Menu } from 'lucide-react';
import useClickableCard from '@/utils/useClickableCard';
import Link from 'next/link';

const Headers = () => {
  const { card, link } = useClickableCard({ external: true, newTab: true, scroll: true });
  const [isExternalSidebarOpen, setIsExternalSidebarOpen] = useState(false);
  const pathname = usePathname();

  const toggleExternalSidebar = () => {
    setIsExternalSidebarOpen(!isExternalSidebarOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isExternalSidebarOpen && !(event.target as Element).closest('.external-sidebar')) {
        setIsExternalSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExternalSidebarOpen]);

  return (
    <div>
      <div className="flex flex-row pl-2">
        <button onClick={toggleExternalSidebar} className="hidden sm:block">
          <Menu size={24} />
        </button>
        <div className="font-bold uppercase sm:px-4 flex items-center">
          <Link href="/">
            Chikiimass
          </Link>
          {/* Beta Badge */}
          <sup className="ml-1 text-xs align-super bg-yellow-200 text-yellow-800 px-1 py-0.5 rounded-lg border border-yellow-400">
            Beta
          </sup>
        </div>
      </div>
      {/* External Sidebar */}
      <ExternalSidebar isOpen={isExternalSidebarOpen} toggleSidebar={toggleExternalSidebar} />
    </div>
  );
};

export default Headers;
