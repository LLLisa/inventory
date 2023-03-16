import React from 'react';
import { Link, useParams } from 'react-router-dom';

export default function () {
  const pageNum = useParams().pageNum * 1;
  console.log(pageNum);

  return (
    <div>
      <h1>Living the Program</h1>
      <nav>
        <Link to={`/${pageNum - 1}`}>
          <button>back</button>
        </Link>
        <Link to={`/${pageNum + 1}`}>
          <button>forward</button>
        </Link>
      </nav>
    </div>
  );
}
