"use client";
import { Home, Settings, Tv } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const BottomTab = () => {
  const pathname = usePathname();

  return (
    <div className="">
      <div className="btm-nav rounded-none tabs-boxed fixed bottom-0 w-full bg-base-100 border-t-primary border-t sm:hidden xl:hidden lg:hidden">
        <Link href="/" passHref>
          <div
            className={`tab flex-1 text-center hover:bg-base-300 hover:text-secondary ${pathname === "/" ? "bg-base-300 text-secondary" : ""
              }`}
          >
            <Home />
          </div>
        </Link>
        <Link href="/tv" passHref>
          <div
            className={`tab flex-1 text-center hover:bg-base-300 hover:text-secondary ${pathname === "/tv" ? "bg-base-300 text-secondary" : ""
              }`}
          >
            <Tv />
          </div>
        </Link>
        <Link href="/settings" passHref>
          <div
            className={`tab flex-1 text-center  hover:bg-base-300 hover:text-secondary ${pathname === "/settings" ? "bg-base-300 text-secondary" : ""
              }`}
          >
            <Settings />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default BottomTab;