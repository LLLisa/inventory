import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div className='menu-container content-container '>
      <div className='menu-button-group'>
        <Link className='unstyled-link' to='/0'>
          <h2>Begin Inventory</h2>
        </Link>
        <p className='margin-bot'>Begin a tenth step inventory using the NA IP no. 9</p>
        <Link className='unstyled-link' to='/bt'>
          <h2>Read Step 10</h2>
        </Link>
        <p className='wrap'>
          Read Step 10 from the Basic Text of Narcotics Anonymous, Sixth Edition
        </p>
      </div>
      <div className='meta-links'>
        <a href='https://www.na.org/meetingsearch/' target='_blank' className='unstyled-link'>
          <h4>Find a meeting</h4>
        </a>
        <a href='https://www.na.org' target='_blank' className='unstyled-link'>
          <h4>Visit the NA website</h4>
        </a>
        <Link className='unstyled-link' to='/about'>
          <h4>About this Application</h4>
        </Link>
      </div>
    </div>
  );
};
