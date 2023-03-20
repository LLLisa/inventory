import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function () {
  const pageNum = useParams().pageNum * 1;

  return (
    <header>
      <nav>
        {!Number.isNaN(pageNum) && pageNum > 0 ? (
          <Link className='unstyled-link' to={pageNum ? `/${pageNum - 1}` : '/'}>
            <div className='nav-button'>&lt; prev</div>
          </Link>
        ) : (
          <div className='nav-button'></div>
        )}
        <Link className='unstyled-link' to='/' id='home-button'>
          <h1>Living the Program</h1>
        </Link>
        {!Number.isNaN(pageNum) && pageNum < 5 ? (
          <Link className='unstyled-link' to={Number.isInteger(pageNum) ? `/${pageNum + 1}` : '/0'}>
            <div className='nav-button right-text'>next &gt;</div>
          </Link>
        ) : (
          <div className='nav-button'></div>
        )}
      </nav>
    </header>
  );
}
