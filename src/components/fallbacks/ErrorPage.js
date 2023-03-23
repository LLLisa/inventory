import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <section id='error-page'>
      <h1>
        An unknown error has occurred. Please click <Link to='/'>here</Link> to go back.
      </h1>
    </section>
  );
};
