import React from 'react';
import { useLoaderData } from 'react-router-dom';
import OutputForm from '../OutputForm';

export default function () {
  const data = useLoaderData();

  const promptTypes = {
    yesNo: 'yesNo',
    smallText: 'smallText',
    bigText: 'bigText',
  };

  const inputFields = (prompt) => {
    switch (prompt.type) {
      case promptTypes.yesNo:
        return (
          <div>
            yes
            <input name={prompt.text} value='yes' type='radio'></input>
            no
            <input name={prompt.text} value='no' type='radio'></input>
          </div>
        );
      case promptTypes.smallText:
        return <input name={prompt.text}></input>;
      case promptTypes.bigText:
        return <input className='bigText' name={prompt.text}></input>;
      default:
        break;
    }
  };

  const handleOnChange = (ev) => {
    if (ev.target.type !== 'radio') ev.preventDefault();
    OutputForm[ev.target.name] = ev.target.value;
  };

  return (
    <form onChange={handleOnChange}>
      <h2>{data.title}</h2>
      <ul>
        {data.prompts.map((prompt, index) => {
          return (
            <li key={index}>
              <div>
                {prompt.text}
                {inputFields(prompt)}
              </div>
              {prompt.sub && (
                <>
                  <div> &#9900; {prompt.sub.text}</div>
                  <div>{inputFields(prompt.sub)}</div>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </form>
  );
}
