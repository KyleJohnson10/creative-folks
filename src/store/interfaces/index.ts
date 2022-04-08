export interface IAppContext {
  state: IState;
}

export interface IState {
  posts: IPost[];
  comments: IComment[];
}

export interface IPost {
  id: number;
  title: string;
}

export interface IComment {
  id: number;
  body: string;
  postId: number;
}