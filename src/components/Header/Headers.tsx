'use client';
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import ExternalSidebar from '@/components/Sidebar/ExternalSidebar';
import { Menu } from 'lucide-react';
import useClickableCard from '@/utils/useClickableCard';

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
        <div ref={card.ref} className="font-bold uppercase sm:px-4">
          <a ref={link.ref} href="/">
            Chikiimass
          </a>
        </div>
      </div>
      {/* External Sidebar */}
      <ExternalSidebar isOpen={isExternalSidebarOpen} toggleSidebar={toggleExternalSidebar} />
    </div>
  );
};

export default Headers;
