import React from 'react';
import { Link, useParams } from 'react-router-dom';

export default function () {
  const pageNum = useParams().pageNum * 1;

  return (
    <header>
      <nav>
        {!Number.isNaN(pageNum) ? (
          <Link to={pageNum ? `/${pageNum - 1}` : '/'}>
            <button>&lt; prev</button>
          </Link>
        ) : (
          <div></div>
        )}
        <Link to='/' id='home-button'>
          <h1>Living the Program</h1>
        </Link>
        {!Number.isNaN(pageNum) ? (
          <Link to={Number.isInteger(pageNum) ? `/${pageNum + 1}` : '/0'}>
            <button disabled={pageNum >= 5}>next &gt;</button>
          </Link>
        ) : (
          <div></div>
        )}
      </nav>
    </header>
  );
}
