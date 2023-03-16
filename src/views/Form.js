import React from 'react';
import { useLoaderData } from 'react-router-dom';

export default function () {
  const data = useLoaderData();
  console.log(data);

  const promptType = {
    yesNo: (
      <div>
        <input type='radio'></input>
        <input type='radio'></input>
      </div>
    ),
    smallText: <input></input>,
    bigText: <input className='bigText'></input>,
  };

  return (
    <form>
      <h2>{data.title}</h2>
      <ul>
        {data.prompts.map((prompt, index) => {
          return (
            <li key={index}>
              <div>
                {prompt.text}
                {promptType[prompt.type]}
              </div>
              {prompt.sub && <div> &#9900; {prompt.sub.text}</div>}
            </li>
          );
        })}
      </ul>
    </form>
  );
}
