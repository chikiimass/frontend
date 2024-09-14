'use client';

import { useContext } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';
import HomePage from '../../page';

const themes = [
  { name: 'system', className: 'bg-base-100 text-base-900' },
  { name: 'light', className: 'bg-base-100 text-base-900' },
  { name: 'dark', className: 'bg-base-100 text-base-100' }
];

export default function AppearanceSettings() {
  const { theme, changeTheme } = useContext(ThemeContext);

  if (!changeTheme) {
    return null;
  }

  const handleChangeTheme = (selectedTheme: string) => {
    changeTheme(selectedTheme);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Appearance Settings</h2>
      <div className="mockup-phone">
        <div className="camera"></div>
        <div className="display">
          <div className="artboard artboard-demo phone-1"><HomePage /></div>
        </div>
      </div>
      <div className="space-y-2">
        {themes.map((themeItem) => (
          <div key={themeItem.name} className={`p-4 border rounded-lg ${themeItem.className}`}>
            <input
              type="radio"
              id={themeItem.name}
              name="theme"
              value={themeItem.name}
              checked={theme === themeItem.name}
              onChange={() => handleChangeTheme(themeItem.name)}
              className="mr-2"
            />
            <label htmlFor={themeItem.name} className="cursor-pointer">
              {themeItem.name.charAt(0).toUpperCase() + themeItem.name.slice(1)}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
