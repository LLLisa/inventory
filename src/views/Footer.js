import React from 'react';
import { outputForm, fullText, generateHTML } from '../utils';

export default function () {
  const handleDownload = () => {
    const testing = document.querySelector('#testing');
    testing.innerHTML = generateHTML(outputForm);

    console.dir(outputForm);
  };

  return (
    <footer>
      <button onClick={handleDownload}>Download PDF</button>
      <p>
        This is NA Fellowship-approved literature. Copyright © 1983 by Narcotics Anonymous World
        Services, Inc. All rights reserved.
      </p>
      <div id='testing'></div>
    </footer>
  );
}
