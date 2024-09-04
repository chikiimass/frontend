import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  snapPoints?: string[];
  initialSnapIndex?: number; 
  fullScreen?: boolean; 
  children: React.ReactNode;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  snapPoints = ['25%', '50%', '75%', '100%'],
  initialSnapIndex = 1,
  fullScreen = false,
  children,
}) => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const [dragY, setDragY] = useState(0);
  const [currentSnap, setCurrentSnap] = useState(initialSnapIndex);
  const [translateY, setTranslateY] = useState('100%');

  useEffect(() => {
    if (isOpen) {
      setTranslateY(snapPoints[initialSnapIndex]);
      document.body.style.overflow = 'hidden';
    } else {
      setTranslateY('100%');
      document.body.style.overflow = '';
    }
  }, [isOpen, snapPoints, initialSnapIndex]);

  const handleDragStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true);
    setDragStartY('touches' in e ? e.touches[0].clientY : e.clientY);
  };

  const handleDragMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return;
    const currentY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const newY = Math.max(currentY - dragStartY, 0);
    setDragY(newY);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    const snapHeights = snapPoints.map(point => parseFloat(point));
    const windowHeight = window.innerHeight;
    const snapHeightsInPixels = snapHeights.map(point => (point <= 1 ? point * windowHeight : point));

    const closestSnapIndex = snapHeightsInPixels.reduce((prevIndex, snapHeight, index) => {
      const snapHeightWithDrag = snapHeight - dragY;
      const prevSnapHeight = snapHeightsInPixels[prevIndex] - dragY;
      return Math.abs(snapHeightWithDrag - windowHeight) < Math.abs(prevSnapHeight - windowHeight) ? index : prevIndex;
    }, currentSnap);

    setCurrentSnap(closestSnapIndex);
    setTranslateY(snapPoints[closestSnapIndex]);
    setDragY(0);

    if (closestSnapIndex === snapPoints.length - 1) onClose();
  };

  if (!isOpen) return null;

  return createPortal(
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      />
      <div
        ref={sheetRef}
        className={clsx(
          'fixed inset-x-0 bottom-0 bg-white shadow-lg transform z-50 transition-transform',
          'duration-300 ease-in-out',
          fullScreen ? 'h-screen' : 'h-auto'
        )}
        style={{
          height: fullScreen ? '100vh' : snapPoints[currentSnap],
          transform: `translateY(${translateY} + ${dragY}px)`,
        }}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
      >
        <div className="px-4 py-6 overflow-y-auto h-full">
          {children}
        </div>
      </div>
    </>,
    document.body
  );
};

export default BottomSheet;
