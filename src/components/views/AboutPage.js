import React from 'react';

export default () => {
  return (
    <section className='content-container'>
      <h2 className='center-text'>About this application</h2>
      <p>
        This app was developed as a way to making a daily inventory more convenient and accessible
        for members of Narcotics Anonymous. The content for the inventory was taken from the NA
        informational Pamphlet #9, "Living the Program". A physical copy of this IP is available
        from <a href='https://www.na.org'>the NA website</a> or{' '}
        <a href='https://www.na.org/meetingsearch/'> find an NA meeting near you.</a>
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
      <p>
        Aside from the text content, the code itself is free and open-source, available &nbsp;
        <a href='https://github.com/LLLisa/inventory'>here</a>&nbsp; under an MIT license. Please
        use it and all of the content here in any way that will be helpful.
      </p>
    </section>
  );
};
