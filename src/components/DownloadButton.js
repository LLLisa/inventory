import React from 'react';
import { outputForm, generateHTML } from '../utils';
import html2pdf from 'html2pdf.js';

export default () => {
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
    <button id='download-button' onClick={handleDownload}>
      Download PDF
    </button>
  );
};
