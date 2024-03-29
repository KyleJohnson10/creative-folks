import { createContext } from 'react';
import { IState, IAppContext } from './interfaces';

export const DefaultState: IState = {
  posts: [
    {
      id: 1,
      title: "Post 1"
    },
    {
      id: 2,
      title: "Post 2"
    },
    {
      id: 3,
      title: "Post 3"
    }
  ],
  comments: [
    {
      id: 1,
      body: "some comment data related to post 1",
      postId: 1,
    },
    {
      id: 2,
      body: "some more comment data to show",
      postId: 1,
    },
    {
      id: 3,
      body: "Here's a comment!",
      postId: 2,
    }
  ]
}

export const AppContext = createContext<IAppContext>({
  state: DefaultState,
  updateState: () => null,
});