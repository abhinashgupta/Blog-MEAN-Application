export interface Comment {
  id: string;
  userId: string;
  comment: string;
}

export interface Blog {
  id: string;
  userId: string;
  title: string;
  content: string;
  summary: string;
  comments: Comment[];
}

