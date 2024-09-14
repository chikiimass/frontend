'use client';

const PrivacySettings = () => {
    return (
        <div className="p-6 bg-base-200 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Privacy Settings</h1>
            
            {/* Visibility Settings */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Visibility</h2>
                <label className="label">
                    <span className="label-text">Profile Visibility</span>
                    <select className="select select-bordered w-full max-w-xs">
                        <option>Public</option>
                        <option>Friends Only</option>
                        <option>Private</option>
                    </select>
                </label>
                <label className="label mt-4">
                    <span className="label-text">Who can see your activity?</span>
                    <select className="select select-bordered w-full max-w-xs">
                        <option>Everyone</option>
                        <option>Friends</option>
                        <option>No one</option>
                    </select>
                </label>
            </div>
            
            {/* Data Sharing Settings */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Data Sharing</h2>
                <label className="label cursor-pointer">
                    <span className="label-text">Share data with third-party apps</span>
                    <input type="checkbox" className="toggle" />
                </label>
                <label className="label mt-4 cursor-pointer">
                    <span className="label-text">Receive promotional emails</span>
                    <input type="checkbox" className="toggle" />
                </label>
            </div>
            
            {/* Security Settings */}
            <div>
                <h2 className="text-xl font-semibold mb-2">Account Security</h2>
                <label className="label cursor-pointer">
                    <span className="label-text">Enable two-factor authentication</span>
                    <input type="checkbox" className="toggle" />
                </label>
            </div>
        </div>
    );
};

export default PrivacySettings;