'use client';

import { useContext, useState } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';
import Profile from '../profile/page';

const themes = [
  { name: 'system', className: 'bg-base-100 text-base-900' },
  { name: 'light', className: 'bg-base-100 text-base-900' },
  { name: 'dark', className: 'bg-base-100' },
  { name: 'black', className: 'bg-base-100' },
  { name: 'luxury', className: 'bg-base-100' },
];

const artboardSizes = [
  { name: 'size1', className: 'phone-1', width: '320', height: '568' },
  { name: 'size2', className: 'phone-2', width: '375', height: '667' },
  { name: 'size3', className: 'phone-3', width: '414', height: '736' },
  { name: 'size4', className: 'phone-4', width: '375', height: '812' },
  { name: 'size5', className: 'phone-5', width: '414', height: '896' },
  { name: 'size6', className: 'phone-6', width: '320', height: '1024' },
  { name: 'horizontal1', className: 'artboard-horizontal phone-1', width: '568', height: '320' },
  { name: 'horizontal2', className: 'artboard-horizontal phone-2', width: '667', height: '375' },
  { name: 'horizontal3', className: 'artboard-horizontal phone-3', width: '736', height: '414' },
  { name: 'horizontal4', className: 'artboard-horizontal phone-4', width: '812', height: '375' },
  { name: 'horizontal5', className: 'artboard-horizontal phone-5', width: '896', height: '414' },
  { name: 'horizontal6', className: 'artboard-horizontal phone-6', width: '1024', height: '320' }
];

export default function AppearanceSettings() {
  const { theme, changeTheme } = useContext(ThemeContext);
  const [selectedArtboard, setSelectedArtboard] = useState('size4'); // Default artboard size

  if (!changeTheme) {
    return null;
  }

  const handleChangeTheme = (selectedTheme: string) => {
    changeTheme(selectedTheme);
  };

  const handleChangeArtboard = (sizeName: string) => {
    setSelectedArtboard(sizeName);
  };

  const artboardClass = artboardSizes.find(size => size.name === selectedArtboard)?.className || '';
  const isHorizontal = selectedArtboard.startsWith('horizontal');

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-4xl font-extrabold mb-8 text-center">Appearance Settings</h2>

      <dialog id="my_modal_2" className="modal">
        <div className={isHorizontal ? "modal-box w-11/12 max-w-5xl" : "modal-box"}>
          <p className="py-4 font-mono italic text-sm">Press ESC key or click on ✕ button to close</p>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <div className="mb-8 flex justify-center">
            <div className="mockup-phone">
              <div className="camera"></div>
              <div className="display">
                <div className={`artboard bg-base-100 ${artboardClass} overflow-x-scroll`}>
                  <Profile />
                </div>
              </div>
            </div>
          </div>
          <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
        </div>
      </dialog>

      <div className="space-y-8">
        {/* Artboard Size Selector */}
        <section className="p-6 border border-gray-200 rounded-lg shadow-sm">
          <div className='flex flex-row justify-between'>
            <h3 className="text-3xl font-semibold mb-6">Select Artboard Size</h3>
            <button className="btn  btn-outline btn-primary" onClick={() => document.getElementById('my_modal_2').showModal()}>Preview</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {artboardSizes.map((size) => (
              <div
                key={size.name}
                className={`p-4 border rounded-lg cursor-pointer ${size.className} flex flex-col items-center justify-center transition-transform duration-300 transform hover:scale-105`}
                onClick={() => handleChangeArtboard(size.name)}
              >
                <input
                  type="radio"
                  id={size.name}
                  name="artboard"
                  value={size.name}
                  checked={selectedArtboard === size.name}
                  onChange={() => handleChangeArtboard(size.name)}
                  className="mr-2 radio"
                />
                <label htmlFor={size.name} className="text-sm text-center">
                  {`Artboard ${size.name.replace('size', '')} - ${size.width}x${size.height}`}
                </label>
              </div>
            ))}
          </div>
        </section>

        {/* Theme Selector */}
        <section className="p-6 border border-gray-200 rounded-lg shadow-sm">
          <h3 className="text-3xl font-semibold mb-6">Select Theme</h3>
          <div className="space-y-4">
            {themes.map((themeItem) => (
              <div key={themeItem.name} className={`p-4 border rounded-lg ${themeItem.className} flex items-center`}>
                <input
                  type="radio"
                  id={themeItem.name}
                  name="theme"
                  value={themeItem.name}
                  checked={theme === themeItem.name}
                  onChange={() => handleChangeTheme(themeItem.name)}
                  className="mr-2 radio radio-success"
                />
                <label htmlFor={themeItem.name} className="cursor-pointer">
                  {themeItem.name.charAt(0).toUpperCase() + themeItem.name.slice(1)}
                </label>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
