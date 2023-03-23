import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { outputForm, fullText } from '../../utils';
import { DownloadButton } from '../index';
import { NavBar } from '../Header';

export default () => {
  const { pageNum } = useParams();
  const page = fullText[pageNum];

  const [formValues, setFormValues] = useState(outputForm);

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
            <label htmlFor={prompt.text}>yes</label>
            <input
              className='radio'
              name={prompt.text}
              checked={formValues[prompt.text] === 'yes'}
              value='yes'
              type='radio'
              onChange={handleOnChange}
            ></input>
            &nbsp;
            <label htmlFor={prompt.text}>no</label>
            <input
              className='radio'
              name={prompt.text}
              checked={formValues[prompt.text] === 'no'}
              value='no'
              type='radio'
              onChange={handleOnChange}
            ></input>
          </div>
        );
      case promptTypes.smallText:
        return (
          <>
            <label htmlFor={prompt.text}>{prompt.text}</label>
            <br />
            <input
              className='text-input'
              name={prompt.text}
              value={formValues[prompt.text]}
              onChange={handleOnChange}
              maxLength={3000}
            ></input>
          </>
        );
      case promptTypes.bigText:
        return (
          <>
            <label htmlFor={prompt.text}>{prompt.text}</label>
            <br />
            <textarea
              className='text-input'
              name={prompt.text}
              value={formValues[prompt.text]}
              wordwrap='wrap'
              onChange={handleOnChange}
              rows={5}
              maxLength={3000}
            ></textarea>
          </>
        );
      default:
        console.log('inputFields received: ', prompt);
        break;
    }
  };

  const handleOnChange = async (ev) => {
    if (ev.target.type !== 'radio') ev.preventDefault();
    await setFormValues({ ...formValues, [ev.target.name]: ev.target.value });
    outputForm[ev.target.name] = ev.target.value;
  };

  return (
    <div className='content-container'>
      <form>
        <h3 className='center-text'>{page.title}</h3>
        <ul className='prompt-list-container'>
          {page.prompts.map((prompt) => {
            return (
              prompt.text !== 'Notes' && (
                <li key={prompt.text}>
                  <div className='prompt-container'>
                    {prompt.type === promptTypes.yesNo ? (
                      <div className='yesNo'>
                        {prompt.text}&ensp;{inputFields(prompt)}
                      </div>
                    ) : (
                      <>
                        <div>{inputFields(prompt)}</div>
                      </>
                    )}
                  </div>
                  {prompt.sub && (
                    <div className='prompt-container'>
                      <div>- {inputFields(prompt.sub)}</div>
                    </div>
                  )}
                </li>
              )
            );
          })}
        </ul>
      </form>
      {pageNum === '5' && (
        <div id='notes-container'>
          <div id='notes-label'>
            <label htmlFor='notes'>Notes:</label>
          </div>

          <br />
          <textarea
            className='text-input'
            id='notes'
            name='Notes'
            value={formValues['Notes']}
            wordwrap='wrap'
            onChange={handleOnChange}
            rows={19}
            maxLength={3000}
          ></textarea>
        </div>
      )}
      <div className='hidden'>{NavBar()}</div>
      {pageNum === '5' && <DownloadButton />}
    </div>
  );
};
