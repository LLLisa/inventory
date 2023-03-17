import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { outputForm, fullText } from '../utils';

export default function () {
  const { pageNum } = useParams();
  const page = fullText[pageNum];
  const [formValues, setFormValues] = useState(outputForm);

  const promptTypes = {
    yesNo: 'yesNo',
    smallText: 'smallText',
    bigText: 'bigText',
  };

  const inputFields = (prompt) => {
    const isChecked = (text) => {
      console.log(text, formValues[prompt]);
      return formValues[text] === 'yes';
    };

    switch (prompt.type) {
      case promptTypes.yesNo:
        return (
          <div>
            yes
            <input
              name={prompt.text}
              checked={isChecked(prompt.text)}
              value='yes'
              type='radio'
              onChange={handleOnChange}
            ></input>
            no
            <input name={prompt.text} value='no' type='radio' onChange={handleOnChange}></input>
          </div>
        );
      case promptTypes.smallText:
        return (
          <input
            name={prompt.text}
            checked={isChecked(prompt.text)}
            value={formValues[prompt.text]}
            onChange={handleOnChange}
          ></input>
        );
      case promptTypes.bigText:
        return (
          <input
            className='bigText'
            name={prompt.text}
            value={formValues[prompt.text]}
            onChange={handleOnChange}
          ></input>
        );
      default:
        break;
    }
  };

  const handleOnChange = (ev) => {
    if (ev.target.type !== 'radio') ev.preventDefault();
    setFormValues({ ...formValues, [ev.target.name]: ev.target.value });
    outputForm[ev.target.name] = ev.target.value;
  };

  return (
    <form>
      <h2>{page.title}</h2>
      <ul>
        {page.prompts.map((prompt, index) => {
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
