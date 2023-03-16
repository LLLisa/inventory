import React from 'react';
import { useLoaderData } from 'react-router-dom';

export default function () {
  const data = useLoaderData();

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
