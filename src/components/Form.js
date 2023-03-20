import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { outputForm, fullText, generateHTML } from '../utils';
import html2pdf from 'html2pdf.js';

export default function () {
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
            yes
            <input
              className='radio'
              name={prompt.text}
              checked={formValues[prompt.text] === 'yes'}
              value='yes'
              type='radio'
              onChange={handleOnChange}
            ></input>
            no
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
          <input
            className='text-input'
            name={prompt.text}
            value={formValues[prompt.text]}
            onChange={handleOnChange}
          ></input>
        );
      case promptTypes.bigText:
        return (
          <textarea
            className='big-text text-input'
            name={prompt.text}
            value={formValues[prompt.text]}
            wordwrap='wrap'
            onChange={handleOnChange}
            cols={28}
            rows={5}
          ></textarea>
        );
      default:
        break;
    }
  };

  const handleOnChange = async (ev) => {
    if (ev.target.type !== 'radio') ev.preventDefault();
    await setFormValues({ ...formValues, [ev.target.name]: ev.target.value });
    outputForm[ev.target.name] = ev.target.value;
  };

  const handleDownload = () => {
    const currentDate = new Date().toLocaleDateString().replaceAll('/', '-');
    const filenameString = `DailyInventory_${currentDate}`;

    const options = {
      margin: 0.5,
      filename: filenameString,
      image: { type: 'jpeg', quality: 0.98 },
      enableLinks: true,
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    html2pdf(generateHTML(outputForm), options);
  };

  return (
    <div className='content-container'>
      <form>
        <h3>{page.title}</h3>
        <ul className='prompt-list-container'>
          {page.prompts.map((prompt, index) => {
            return (
              <li key={prompt.text}>
                <div className='prompt-container'>
                  {prompt.type === promptTypes.yesNo ? (
                    <div className='yesNo'>
                      {prompt.text}&ensp;{inputFields(prompt, index)}
                    </div>
                  ) : (
                    <>
                      <div>{prompt.text}</div>
                      <div>{inputFields(prompt, index)}</div>
                    </>
                  )}
                </div>
                {prompt.sub && (
                  <div className='prompt-container'>
                    <div> &#9900; {prompt.sub.text}</div>
                    <div>{inputFields(prompt.sub)}</div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </form>
      {pageNum === '5' && (
        <button id='download-button' onClick={handleDownload}>
          Download PDF
        </button>
      )}
    </div>
  );
}
