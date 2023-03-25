import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { outputForm, fullText } from '../../utils';
import { DownloadButton } from '../index';
import Header from '../Header';

export default () => {
  const { pageNum } = useParams();
  const page = fullText[pageNum];

  const [formValues, setFormValues] = useState(outputForm);

  const promptTypes = {
    yesNo: 'yesNo',
    smallText: 'smallText',
    bigText: 'bigText',
  };

  const inputFields = (prompt, index) => {
    switch (prompt.type) {
      case promptTypes.yesNo:
        return (
          <div>
            <label htmlFor={prompt.text + 'yes'} className='radio-label yes'>
              yes
              <input
                className='radio'
                name={prompt.text}
                id={prompt.text + 'yes'}
                checked={formValues[prompt.text] === 'yes'}
                value='yes'
                type='radio'
                onChange={handleOnChange}
                autoFocus={index === 0}
              ></input>
            </label>
            &nbsp;
            <label htmlFor={prompt.text + 'no'} className='radio-label no'>
              no
              <input
                className='radio'
                name={prompt.text}
                id={prompt.text + 'no'}
                checked={formValues[prompt.text] === 'no'}
                value='no'
                type='radio'
                onChange={handleOnChange}
              ></input>
            </label>
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
              autoFocus={index === 0}
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
              autoFocus={index === 0}
            ></textarea>
          </>
        );
      default:
        console.log('ERROR inputFields received: ', prompt);
        break;
    }
  };

  const handleOnChange = async (ev) => {
    if (ev.target.type !== 'radio') ev.preventDefault();
    await setFormValues({ ...formValues, [ev.target.name]: ev.target.value });
    outputForm[ev.target.name] = ev.target.value;
  };

  window.scrollTo(0, 0);

  return (
    <div className='content-container'>
      <form>
        <h3 className='center-text'>{page.title}</h3>
        <ul className='prompt-list-container'>
          {page.prompts.map((prompt, index) => {
            return (
              prompt.text !== 'Notes' && (
                <li key={prompt.text}>
                  <div className='prompt-container'>
                    {prompt.type === promptTypes.yesNo ? (
                      <div className='yesNo'>
                        {prompt.text}&ensp;{inputFields(prompt, index)}
                      </div>
                    ) : (
                      <>
                        <div>{inputFields(prompt, index)}</div>
                      </>
                    )}
                  </div>
                  {prompt.sub && (
                    <div className='prompt-container'>
                      <div>- {inputFields(prompt.sub, index)}</div>
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
          <textarea
            className='text-input'
            id='notes'
            name='Notes'
            value={formValues['Notes']}
            wordwrap='wrap'
            onChange={handleOnChange}
            rows={16}
            maxLength={3000}
            autoFocus={window.visualViewport.width > 445}
          ></textarea>
        </div>
      )}
      <div className='teeny hidden' name='lower nav bar'>
        {<Header />}
      </div>
      {pageNum === '5' && <DownloadButton />}
    </div>
  );
};
