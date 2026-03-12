export interface IComment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
  optimistic?: boolean;
}

export type IComments = IComment[] | [];
