// Shared types between backend and frontend

export interface User {
  id: number;
  email: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  author: User; // ✅ required, backend always returns author now
}

// Auth responses
export interface LoginResponse {
  token: string;
  message?: string; // backend sends { message, token }
}

// Update response
export interface UpdateResponse {
  post: Post;
}
