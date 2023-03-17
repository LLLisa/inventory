import React from 'react';
import { Link } from 'react-router-dom';

export default function () {
  return (
    <div>
      <p>
        This app was developed as a way to make the taking of a daily inventory more convenient and
        accessible for members of the Narcotics Anonymous community. In the spirit of anonymity,
        none of your responses or personal information are saved anywhere in this website or its
        servers. Therefore, if you navigate away from this website or refresh the page, your entries
        will be lost. You can download a PDF of your responses at any point and save them to your
        device. Aside from this paragraph, all of the text content in this application is
        copyrighted by Narcotics Anonymous World Services, inc.
      </p>
      <Link to='/0'>
        <h3>Begin Inventory</h3>
      </Link>
    </div>
  );
}
