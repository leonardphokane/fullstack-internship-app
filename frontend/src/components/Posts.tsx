import React, { useEffect, useState } from "react";
import { getPosts } from "../services/posts";   // ✅ use service helper

export default function Posts() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  return (
    <div>
      <h2>Posts</h2>
      {posts.map((p) => (
        <div key={p.id} className="card posts-card">
          <h3>{p.title}</h3>
          <p>{p.content}</p>
        </div>
      ))}
    </div>
  );
}
