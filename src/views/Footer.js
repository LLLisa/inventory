import React from 'react';
import { generateHTML, outputForm, fullText } from '../utils';

export default function () {
  const handleDownload = () => {
    // const footer = document.querySelector('footer');
    // footer.innerHTML = generateHTML();

    console.dir(outputForm);
  };

  return (
    <footer>
      <button onClick={handleDownload}>Download PDF</button>
      <p>
        This is NA Fellowship-approved literature. Copyright © 1983 by Narcotics Anonymous World
        Services, Inc. All rights reserved.
      </p>
    </footer>
  );
}
