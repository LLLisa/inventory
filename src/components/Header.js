import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function () {
  const pageNum = useParams().pageNum * 1;

  return (
    <header>
      <nav>
        {!Number.isNaN(pageNum) && pageNum > 0 ? (
          <Link
            className='nav-button unstyled-link'
            id='prev'
            to={pageNum ? `/${pageNum - 1}` : '/'}
          >
            <div>&lt; prev</div>
          </Link>
        ) : (
          <div className='nav-button'></div>
        )}
        <div>
          <Link className='unstyled-link' id='home-button' to='/'>
            <h1>Living the Program</h1>
          </Link>
        </div>
        {!Number.isNaN(pageNum) && pageNum < 5 ? (
          <Link
            className='nav-button unstyled-link'
            id='next'
            to={Number.isInteger(pageNum) ? `/${pageNum + 1}` : '/0'}
          >
            <div className='right-text'>next &gt;</div>
          </Link>
        ) : (
          <div className='nav-button'></div>
        )}
      </nav>
    </header>
  );
}
