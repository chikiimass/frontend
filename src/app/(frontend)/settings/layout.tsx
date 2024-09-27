'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Metadata } from 'next'

/* export const metadata: Metadata = {
    title: 'Settings | Chikiimass',
    openGraph: {
      title: 'Settings | Chikiimass',
      description: 'Set youre Preferance on chikiimass',
    },
  }
 */

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    // Helper function to determine active class with DaisyUI styling
    const getLinkClass = (path: string) =>
        pathname === path ? "text-primary font-bold bg-base-200 rounded-lg" : "text-primary";


    return (
        <div className="container mx-auto px-6 h-screen">
            <div className="relative md:h-full flex flex-col md:flex-row">
                {/* Sidebar Navigation */}
                <nav className="w-full md:w-1/5 lg:w-1/4 bg-base-100 border-b md:border-b-0 md:border-r border-base-200 h-auto md:h-full overflow-y-auto p-4">
                    <ul className="menu">
                        <li className="mb-2">
                            <Link href="/settings/profile" className={getLinkClass('/settings/profile')}>
                                Profile
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link href="/settings/playback" className={getLinkClass('/settings/playback')}>
                                Playback
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link href="/settings/appearance" className={getLinkClass('/settings/appearance')}>
                                Appearance
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link href="/settings/privacy" className={getLinkClass('/settings/privacy')}>
                                Privacy
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link href="/settings/content" className={getLinkClass('/settings/content')}>
                                Content
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link href="/settings/advanced" className={getLinkClass('/settings/advanced')}>
                                Advanced
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Dynamic Content Section */}
                <main className="flex-1 h-full bg-base-200 p-6 md:overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default SettingsLayout;
