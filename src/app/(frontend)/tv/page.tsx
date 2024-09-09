import React from 'react';
import MediaTabs from './page.client';
import MoviesPage from '../movies/page';
import SeriesPage from '../series/page';

export const dynamic = 'force-static';
export const revalidate = 600;

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
