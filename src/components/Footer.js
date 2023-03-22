import React from 'react';
import { useParams } from 'react-router-dom';

export default () => {
  const pageNum = useParams().pageNum;

  return (
    <footer>
      {!Number.isNaN(pageNum * 1) && (
        <p>Copyright © 1983 by Narcotics Anonymous World Services, Inc. All rights reserved.</p>
      )}
      {window.location.pathname === '/bt' && (
        <p>
          Copyright © 1982, 1983, 1984, 1986, 1987, 1988, 2008 by Narcotics Anonymous World
          Services, Inc. All rights reserved.
        </p>
      )}
      {window.location.pathname === '/gg' && (
        <p>Copyright © 1993 by Narcotics Anonymous World Services, Inc. All rights reserved.</p>
      )}
    </footer>
  );
};
