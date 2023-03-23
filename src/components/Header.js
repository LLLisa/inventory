import React from 'react';
import { Link, useParams } from 'react-router-dom';

export default () => {
  const pageNum = useParams().pageNum * 1;

  return (
    <header>
      <nav>
        {!Number.isNaN(pageNum) && pageNum > 0 ? (
          <Link
            className='nav-button unstyled-link prev'
            to={pageNum ? `/${pageNum - 1}` : '/'}
            name='back-button'
          >
            <label htmlFor='back-button'>&lt; prev</label>
          </Link>
        ) : (
          <div className='nav-button prev'></div>
        )}
        <div>
          <Link className='unstyled-link' id='home-button' to='/' name='home-button'>
            <h1>
              <label htmlFor='home-button'>Living the Program</label>
            </h1>
          </Link>
        </div>
        {!Number.isNaN(pageNum) && pageNum < 5 ? (
          <Link
            className='nav-button unstyled-link next'
            to={Number.isInteger(pageNum) ? `/${pageNum + 1}` : '/0'}
            name='next-button'
          >
            <div className='right-text'>
              <label htmlFor='next-button'>next &gt;</label>
            </div>
          </Link>
        ) : (
          <div className='nav-button next'></div>
        )}
      </nav>
    </header>
  );
};
