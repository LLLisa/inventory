import React from 'react';
import { outputForm, generateHTML } from '../utils';
import html2pdf from 'html2pdf.js';

export default () => {
  const handleDownload = (ev) => {
    ev.preventDefault();

    //I love css hacks
    const cssTarget = ev.target.tagName === 'BUTTON' ? ev.target : ev.target.parentNode;
    cssTarget.classList.add('flash');
    setTimeout(() => {
      cssTarget.classList.remove('flash');
    }, 750);

    const currentDate = new Date().toLocaleDateString().replaceAll('/', '-');
    const filenameString = `Daily Inventory for ${currentDate}`;

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
    <div id='download-button-container'>
      <button name='download-button' id='download-button' onClick={(ev) => handleDownload(ev)}>
        <label htmlFor='download-button'>Download PDF</label>
      </button>
    </div>
  );
};
