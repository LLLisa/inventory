import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

export default function () {
  const { pageNum } = useParams();

  const { isLoading, error, data } = useQuery('singlePage', () =>
    fetch(`/page/${pageNum}`).then((res) => res.json())
  );

  if (isLoading) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  console.log(data);

  // return <>Form</>;
  return (
    <form>
      <h2>{data.title}</h2>
      <ul>
        {data.prompts.map((prompt, index) => {
          return <li key={index}>{prompt}</li>;
        })}
      </ul>
    </form>
  );
}
