'use client';

import { useRouter } from 'next/navigation';

const SettingsPage = () => {
    const router = useRouter();

    // Function to navigate to a specific settings page
    const navigateTo = (path: string) => {
        router.push(path);
    };

    return (
        <div className="container mx-auto p-6 h-full flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold mb-6">Settings Dashboard</h1>
            <p className="text-lg mb-4">Manage your account and application settings from here.</p>
            <div className="space-y-4">
                <button
                    onClick={() => navigateTo('/settings/profile')}
                    className="btn btn-primary w-full"
                >
                    Profile Settings
                </button>
                <button
                    onClick={() => navigateTo('/settings/playback')}
                    className="btn btn-secondary w-full"
                >
                    Playback Settings
                </button>
                <button
                    onClick={() => navigateTo('/settings/appearance')}
                    className="btn btn-accent w-full"
                >
                    Appearance Settings
                </button>
                <button
                    onClick={() => navigateTo('/settings/privacy')}
                    className="btn btn-info w-full"
                >
                    Privacy Settings
                </button>
                <button
                    onClick={() => navigateTo('/settings/content')}
                    className="btn btn-warning w-full"
                >
                    Content Settings
                </button>
                <button
                    onClick={() => navigateTo('/settings/advanced')}
                    className="btn btn-error w-full"
                >
                    Advanced Settings
                </button>
            </div>
        </div>
    );
};

export default SettingsPage;
