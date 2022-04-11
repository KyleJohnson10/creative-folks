export interface IAppContext {
  state: IState;
  updateState: (value: IState) => void;
}

export interface IState {
  posts?: IPost[];
  comments?: IComment[];
}

export type IUpdateState = {posts?: IPost[] } | {comments?: IComment[] }

export interface IPost {
  id: number;
  title: string;
}

export interface IComment {
  id: number;
  body: string;
  postId: number;
}