'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define types for announcements
type Announcement = {
  id: string;
  message: string;
  link?: string;
  linkText?: string;
  type?: 'info' | 'warning' | 'success';
  dismissible?: boolean;
  reappearAfter?: number;
  createdAt: string;
};

const NotificationContext = createContext<any>(null);

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [dismissed, setDismissed] = useState<string[]>([]);

  // Fetch notifications from the API
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('/api/notifications');
        const data = await response.json();
        console.log(data.docs)
        setAnnouncements(data.docs); // Set announcements from API response
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();

    // Load dismissed announcements from localStorage
    const storedDismissed = localStorage.getItem('dismissedAnnouncements');
    if (storedDismissed) {
      setDismissed(JSON.parse(storedDismissed));
    }
  }, []);

  // Function to dismiss an announcement
  const dismissAnnouncement = (id: string, temporary = false) => {
    const updatedDismissed = [...dismissed, id];
    setDismissed(updatedDismissed);
    localStorage.setItem('dismissedAnnouncements', JSON.stringify(updatedDismissed));

    if (temporary) {
      const announcement = announcements.find(a => a.id === id);
      if (announcement?.reappearAfter) {
        setTimeout(() => {
          setDismissed((prev) => prev.filter(d => d !== id));
        }, announcement.reappearAfter);
      }
    }
  };

  // Filter out dismissed announcements
  const visibleAnnouncements = announcements.filter(
    (announcement) => !dismissed.includes(announcement.id)
  );

  return (
    <NotificationContext.Provider value={{ visibleAnnouncements, dismissAnnouncement }}>
      {children}
    </NotificationContext.Provider>
  );
};
