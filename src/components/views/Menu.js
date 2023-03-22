import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div className='content-container'>
      <Link className='unstyled-link' to='/0'>
        <h3>Begin Inventory</h3>
      </Link>
      <Link className='unstyled-link' to='/bt'>
        <h3>Read Step 10 in the Basic Text</h3>
      </Link>
      <Link className='unstyled-link' to='/about'>
        <h3>About this Application</h3>
      </Link>
    </div>
  );
};
