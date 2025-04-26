export interface Comment {
  id: number;
  username: string;
  content: string;
  createdAt: string;
  postId?: number;
}

export interface Post {
  id: number;
  title: string;
  article: string;
  image: string;
  createdAt: string;
  category: string;
  comments?: Comment[];
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  statusCode: number;
}