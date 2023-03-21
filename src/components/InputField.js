import React from 'react';
import { outputForm } from '../utils';

export default (prompt) => {
  const promptTypes = {
    yesNo: 'yesNo',
    smallText: 'smallText',
    bigText: 'bigText',
  };

  switch (prompt.type) {
    case promptTypes.yesNo:
      return (
        <div>
          yes
          <input
            className='radio'
            name={prompt.text}
            checked={outputForm[prompt.text] === 'yes'}
            value='yes'
            type='radio'
            onChange={handleOnChange}
          ></input>
          no
          <input
            className='radio'
            name={prompt.text}
            checked={outputForm[prompt.text] === 'no'}
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
          value={outputForm[prompt.text]}
          onChange={handleOnChange}
          maxLength={3000}
        ></input>
      );
    case promptTypes.bigText:
      return (
        <textarea
          className='big-text text-input'
          name={prompt.text}
          value={outputForm[prompt.text]}
          wordwrap='wrap'
          onChange={handleOnChange}
          rows={5}
          maxLength={3000}
        ></textarea>
      );
    default:
      break;
  }
};
