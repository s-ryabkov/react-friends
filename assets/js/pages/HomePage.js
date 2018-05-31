import React from 'react';
import CommonLayout from './layouts/CommonLayout';

function HomePage() {
  return (
    <CommonLayout className={'page-home'}>
      <h1 className='home-page text-center'>
        Nice to meet you. This is the template home page.
      </h1>
    </CommonLayout>

  );
}

export default HomePage;
