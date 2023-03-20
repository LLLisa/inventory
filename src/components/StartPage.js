import React from 'react';
import { Link } from 'react-router-dom';

export default function () {
  return (
    <div className='content-container'>
      <p>
        This app was developed as a way to making a daily inventory more convenient and accessible
        for members of Narcotics Anonymous. The content for the inventory was taken from the NA
        informational Pamphlet #9, "Living the Program". A physical copy of this IP is available
        from <a href='https://www.na.org'>the NA website</a> or at an NA meeting near you.
      </p>
      <p>
        In the spirit of anonymity, none of your responses or personal information are saved
        anywhere in this website or its servers. You can download a PDF of your responses and save
        them to your device on the last page.
      </p>
      <p>
        All of the textual content in this application, aside from this page, is copyright Narcotics
        Anonymous World Services, inc.
      </p>
      <Link className='unstyled-link' to='/0'>
        <h3>Begin Inventory</h3>
      </Link>
      <Link className='unstyled-link' to='/bt'>
        <h3>Read Step 10 in the Basic Text</h3>
      </Link>
    </div>
  );
}
