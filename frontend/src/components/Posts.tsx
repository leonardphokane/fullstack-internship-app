import React, { useEffect, useState } from "react";
import api from "../api";

interface Post {
  id: number;
  title: string;
  content: string;
  author: { id: number; email: string };
}

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // ✅ Tell Axios the response type
        const res = await api.get<Post[]>("/posts");
        setPosts(res.data);
      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to load posts");
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="posts-container">
      <h2>Posts</h2>
      {error && <p className="error">{error}</p>}
      {posts.map((post) => (
        <div key={post.id} className="post-card">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <small>By {post.author.email}</small>
        </div>
      ))}
    </div>
  );
}
