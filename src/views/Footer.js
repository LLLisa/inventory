import React from 'react';
import { useParams } from 'react-router-dom';
import { outputForm, generateHTML } from '../utils';
import html2pdf from 'html2pdf.js';

export default function () {
  const pageNum = useParams().pageNum * 1;

  const handleDownload = () => {
    const currentDate = new Date().toLocaleDateString().replaceAll('/', '-');
    const filenameString = `DailyInventory_${currentDate}`;

    // const testing = document.querySelector('#testing');
    // testing.innerHTML = generateHTML(outputForm);

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
    <footer>
      {!Number.isNaN(pageNum) && <button onClick={handleDownload}>Download PDF</button>}
      <p>
        This is NA Fellowship-approved literature. Copyright © 1983 by Narcotics Anonymous World
        Services, Inc. All rights reserved.
      </p>
    </footer>
  );
}
