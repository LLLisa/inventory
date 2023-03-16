import React from 'react';
import { Link, useParams } from 'react-router-dom';

export default function () {
  const pageNum = useParams().pageNum * 1;

  return (
    <header>
      <Link to={'/'}>
        <h1>Living the Program</h1>
      </Link>
      <nav>
        <Link to={`/${pageNum - 1}`}>
          <button disabled={!Number.isInteger(pageNum) || pageNum <= 0}>back</button>
        </Link>
        <Link to={Number.isInteger(pageNum) ? `/${pageNum + 1}` : '/0'}>
          <button disabled={pageNum >= 5}>forward</button>
        </Link>
      </nav>
    </header>
  );
}
