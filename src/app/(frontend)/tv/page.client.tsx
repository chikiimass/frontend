'use client';

import React, { useState } from 'react';

interface MediaTabsProps {
  children: React.ReactNode[];
}

const MediaTabs: React.FC<MediaTabsProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="">
      <div className="tabs tabs-boxed ">
        <a
          className={`tab ${activeTab === 0 ? 'tab-active' : ''}`}
          onClick={() => setActiveTab(0)}
        >
          Movies
        </a>
        <a
          className={`tab ${activeTab === 1 ? 'tab-active' : ''}`}
          onClick={() => setActiveTab(1)}
        >
          Series
        </a>
      </div>

      <div className="">
        {React.Children.toArray(children)[activeTab]}
      </div>
    </div>
  );
};

export default MediaTabs;
