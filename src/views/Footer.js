import React from 'react';
import OutputForm from '../outputForm';
import fullText from '../fullText';

export default function () {
  const handleDownload = () => {
    console.dir(fullText);
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
