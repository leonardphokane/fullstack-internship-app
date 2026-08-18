import React, { useEffect, useState } from "react";
import api from "../api";

export default function MyPosts() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    api.get("/myposts").then((res) => setPosts(res.data));
  }, []);

  return (
    <div className="flashcards">
      {posts.map((p) => (
        <div key={p.id} className="card posts-card">
          <h3>{p.title}</h3>
          <p>{p.content}</p>
        </div>
      ))}
    </div>
  );
}
