'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    // Helper function to determine active class with DaisyUI styling
    const getLinkClass = (path: string) =>
        pathname === path ? "text-primary font-bold bg-base-200 rounded-lg" : "text-primary";

    return (
        <div className="container mx-auto p-6 h-screen">
            <div className="relative h-full flex">
                {/* Sidebar Navigation */}
                <nav className="w-1/5 lg:w-1/4 bg-base-100 border-r border-base-200 h-full overflow-y-auto p-4">
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
                <main className="flex-1 h-full bg-base-200 p-6 overflow-y-auto">
                    {children}

                    {/* Save and Cancel Buttons */}
                    <div className="mt-8 flex justify-end space-x-4">
                        <button className="btn btn-outline btn-secondary">
                            Cancel
                        </button>
                        <button className="btn btn-primary">
                            Save Changes
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default SettingsLayout;
