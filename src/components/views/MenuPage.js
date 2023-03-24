import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div className='menu-container content-container '>
      <div className='menu-button-group'>
        <Link className='unstyled-link' to='/0'>
          <h2>Begin Inventory</h2>
        </Link>
        <p>Begin a tenth step inventory using the NA IP no. 9</p>
        <Link className='unstyled-link' to='/bt'>
          <h2>From our Basic Text</h2>
        </Link>
        <p className='wrap'>
          Read Step 10 from the Basic Text of Narcotics Anonymous, Sixth Edition
        </p>
        <Link className='unstyled-link' to='/gg'>
          <h2>From It Works: How & Why</h2>
        </Link>
        <p className='wrap'>
          Read Step 10 from It Works: How & Why - The 12 Steps and 12 Traditions of Narcotics
          Anonymous
        </p>
      </div>
      <div id='meta-links'>
        <a
          href='https://www.na.org/meetingsearch/'
          target='_blank'
          className='unstyled-link meta-link'
        >
          <h4>Find a meeting</h4>
        </a>
        <a href='https://www.na.org' target='_blank' className='unstyled-link meta-link'>
          <h4>Visit the NA website</h4>
        </a>
        <Link className='unstyled-link meta-link' to='/about'>
          <h4>About this Application</h4>
        </Link>
      </div>
    </div>
  );
};
