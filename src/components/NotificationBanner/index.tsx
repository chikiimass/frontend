'use client'
import React, { useEffect } from 'react';
import { useNotification } from '@/context/Notification';

const NotificationBanner = () => {
  const { visibleAnnouncements, dismissAnnouncement } = useNotification();

  useEffect(() => {
    visibleAnnouncements.forEach(announcement => {
      if (!announcement.dismissible && announcement.reappearAfter) {
        setTimeout(() => {
          dismissAnnouncement(announcement.id, true);
        }, announcement.reappearAfter);
      }
    });
  }, [visibleAnnouncements, dismissAnnouncement]);

  if (visibleAnnouncements.length === 0) return null;

  return (
    <div className="fixed bottom-0 w-64 z-50">
      {visibleAnnouncements.map((announcement) => (
        <div
          key={announcement.id}
          className={`p-4 text-white ${
            announcement.type === 'info'
              ? 'bg-blue-500'
              : announcement.type === 'warning'
              ? 'bg-yellow-500'
              : 'bg-green-500'
          } relative flex justify-between items-center`}
          style={
            announcement.dismissible
              ? {} // Default to top layout for dismissible
              : { position: 'fixed', bottom: '10px', left: '10px', width: '300px' } // For non-dismissible
          }
        >
          <div>
            {announcement.message}{' '}
            {announcement.link && (
              <a
                href={announcement.link}
                className="underline font-semibold"
                target="_blank"
                rel="noopener noreferrer"
              >
                {announcement.linkText}
              </a>
            )}
          </div>

          {announcement.dismissible && (
            <button
              onClick={() => dismissAnnouncement(announcement.id)}
              className="ml-4 text-white font-bold"
            >
              &#10005;
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default NotificationBanner;
