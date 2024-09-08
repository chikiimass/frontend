import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home as HomeIcon,
  Tv as TvIcon,
  Settings as SettingsIcon,
  Menu as MenuIcon,
} from "lucide-react";
import Footer from "../Footer";

interface ExternalSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const ExternalSidebar: React.FC<ExternalSidebarProps> = ({
  isOpen,
  toggleSidebar,
}) => {
  const pathname = usePathname();

  return (
    <>
      <div
        className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"
          } bg-base-100  w-60 flex flex-col`}
      >
        <div className="sticky top-0 bg-base-100  w-60 z-50">
          <div className="flex flex-row pl-4">
            <button onClick={toggleSidebar} className="p-2">
              <MenuIcon />
            </button>
            <div className="py-[18px] px-4 uppercase font-bold">Chikiimass</div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          <nav className="flex flex-col space-y-4 p-3 text-sm lg:mt-0">
            <Link href="/" passHref>
              <div
                className={`hover:bg-base-300  hover:text-secondary rounded-md p-3 flex flex-row items-center ${pathname === "/" ? "bg-base-300 text-secondary" : ""
                  }`}
              >
                <HomeIcon size={24} />
                <div className="pl-8">Home</div>
              </div>
            </Link>
            <Link href="/tv" passHref>
              <div
                className={`hover:bg-base-300 hover:text-secondary rounded-md p-3 flex flex-row items-center ${pathname === "/tv" ? "bg-base-300 text-secondary" : ""
                  }`}
              >
                <TvIcon size={24} />
                <div className="pl-8">TV</div>
              </div>
            </Link>
            <Link href="/settings" passHref>
              <div
                className={`hover:bg-base-300 hover:text-secondary rounded-md p-3 flex flex-row items-center ${pathname === "/settings" ? "bg-base-300 text-secondary" : ""
                  }`}
              >
                <SettingsIcon size={24} />
                <div className="pl-8">Settings</div>
              </div>
            </Link>
          </nav>
          <Footer />
          <div className="py-4 px-6 text-center text-sm text-[#909090]">
            &copy; {new Date().getFullYear()} Chikiimass. All rights reserved.
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default ExternalSidebar;