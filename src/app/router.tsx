import { Router } from '@reach/router';
import React, { FunctionComponent } from 'react';
import { PostPage } from './post-page';
import { Homepage } from './homepage';

export const AppRouter: FunctionComponent = () => {

  return (
    <>
      <Router>
        <Homepage path="/" />
        <PostPage path="/post/:route" />
      </Router>
    </>
  );
};
