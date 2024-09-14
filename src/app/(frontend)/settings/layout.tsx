'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [showCancelToast, setShowCancelToast] = useState(false);

    // Helper function to determine active class with DaisyUI styling
    const getLinkClass = (path: string) =>
        pathname === path ? "text-primary font-bold bg-base-200 rounded-lg" : "text-primary";

    const handleSaveChanges = () => {
        // Simulate saving data
        // Replace this with your actual save logic
        setShowSuccessToast(true);

        // Hide the toast after 3 seconds
        setTimeout(() => setShowSuccessToast(false), 3000);
    };

    const handleCancel = () => {
        // Simulate cancel action
        // Replace this with your actual cancel logic
        setShowCancelToast(true);

        // Hide the toast after 3 seconds
        setTimeout(() => setShowCancelToast(false), 3000);
    };

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
                        <button className="btn btn-outline btn-secondary" onClick={handleCancel}>
                            Cancel
                        </button>
                        <button className="btn btn-primary" onClick={handleSaveChanges}>
                            Save Changes
                        </button>
                    </div>

                    {/* Success Toast for Save Changes */}
                    {showSuccessToast && (
                        <div className="toast toast-bottom toast-end rounded-none">
                            <div className="alert alert-success rounded-none">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 shrink-0 stroke-current"
                                    fill="none"
                                    viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Saved successfully.</span>
                            </div>
                        </div>
                    )}

                    {/* Toast for Cancel */}
                    {showCancelToast && (
                        <div className="toast toast-bottom toast-end rounded-none">
                            <div className="alert alert-error rounded-none">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 shrink-0 stroke-current"
                                    fill="none"
                                    viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Changes canceled.</span>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default SettingsLayout;
