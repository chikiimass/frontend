import React from 'react';
import MediaTabs from './page.client';
import MoviesPage from '../movies/page';
import SeriesPage from '../series/page';

const MainPage: React.FC = () => {
  return (
    <div className="">
      <MediaTabs>
        <MoviesPage />
        <SeriesPage />
      </MediaTabs>
    </div>
  );
};

export default MainPage;
