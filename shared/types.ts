// Shared types between backend and frontend

export interface User {
  id: number;
  email: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  author: User;
}

// Auth responses
export interface LoginResponse {
  token: string;
}

// Update response
export interface UpdateResponse {
  post: Post;
}
