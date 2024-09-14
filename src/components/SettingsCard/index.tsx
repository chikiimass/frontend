// components/SettingsCard.tsx
const SettingsCard = () => {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="notifications"
              className="form-checkbox"
            />
            <label htmlFor="notifications" className="text-gray-700 dark:text-gray-200">
              Enable Notifications
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="autoSave"
              className="form-checkbox"
            />
            <label htmlFor="autoSave" className="text-gray-700 dark:text-gray-200">
              Enable Auto-Save
            </label>
          </div>
        </div>
      </div>
    );
  };
  
  export default SettingsCard;
  