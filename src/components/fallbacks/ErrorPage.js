import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div id='error-page'>
      An unknown error has occurred. Please click <Link to='/'>here</Link> to go back.
    </div>
  );
};
