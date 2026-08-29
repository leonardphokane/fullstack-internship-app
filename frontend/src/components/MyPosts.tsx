import React, { useEffect, useState } from "react";
import { getMyPosts } from "../services/posts";
import { Post } from "shared/types";

export default function MyPosts() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getMyPosts().then(setPosts);
  }, []);

  return (
    <div>
      <h2>My Posts</h2>
      {posts.map((p) => (
        <div key={p.id} className="card posts-card">
          <h3>{p.title}</h3>
          <p>{p.content}</p>
        </div>
      ))}
    </div>
  );
}
