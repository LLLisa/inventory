import React from 'react';
import { useQuery } from 'react-query';

export default function () {
  const { isLoading, error, data } = useQuery('fullText', () => fetch('/fullText').then((res) => res.json()));

  if (isLoading) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  console.log(data);

  return <>Form</>;
}
