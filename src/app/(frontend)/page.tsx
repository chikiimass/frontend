'use client'
import React, { useState } from 'react';
import BottomSheet from './video/[id]/BottomSheet';

const Page = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);

  const handleOpenSheet = () => {
    setIsSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <button
        onClick={handleOpenSheet}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Open Bottom Sheet
      </button>

      <label className="mb-4">
        <input
          type="checkbox"
          checked={fullScreen}
          onChange={(e) => setFullScreen(e.target.checked)}
          className="mr-2"
        />
        Full Screen Mode
      </label>

      <BottomSheet
        isOpen={isSheetOpen}
        onClose={handleCloseSheet}
        snapPoints={['25%', '50%', '75%', '100%']}
        initialSnapIndex={1}
        fullScreen={fullScreen}
      >
        <p>Your advanced bottom sheet content goes here.</p>
        <button
          onClick={handleCloseSheet}
          className="bg-red-500 text-white w-full mt-4 py-2 rounded"
        >
          Close
        </button>
      </BottomSheet>
    </div>
  );
};

export default Page;
