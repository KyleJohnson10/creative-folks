import { Router } from '@reach/router';
import React, { FunctionComponent } from 'react';
import { CommentPage } from './comment-page';
import { Homepage } from './homepage';

export const AppRouter: FunctionComponent = () => {

  return (
    <>
      <Router>
        <Homepage path="/" />
        <CommentPage path="/comment/:route" />
      </Router>
    </>
  );
};
