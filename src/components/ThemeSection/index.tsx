'use client'
import { useState } from 'react';

const ThemeCard = () => {
  const [theme, setTheme] = useState('light');

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(event.target.value);
    // Handle theme change logic here
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Select Theme</h2>
      <div className="flex flex-col space-y-4">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="theme"
            value="light"
            checked={theme === 'light'}
            onChange={handleThemeChange}
            className="form-radio"
          />
          <span className="text-gray-700 dark:text-gray-200">Light</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="theme"
            value="dark"
            checked={theme === 'dark'}
            onChange={handleThemeChange}
            className="form-radio"
          />
          <span className="text-gray-700 dark:text-gray-200">Dark</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="theme"
            value="custom"
            checked={theme === 'custom'}
            onChange={handleThemeChange}
            className="form-radio"
          />
          <span className="text-gray-700 dark:text-gray-200">Custom</span>
        </label>
      </div>
    </div>
  );
};

export default ThemeCard;
