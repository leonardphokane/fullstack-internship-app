import React, { useState } from "react";
import api from "../api";

export default function CreatePost({ token }: { token: string }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleCreate = async () => {
    await api.post("/posts", { title, content }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTitle("");
    setContent("");
    alert("Post created!");
  };

  return (
    <div>
      <h2>Create Post</h2>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <textarea placeholder="Content" value={content} onChange={e => setContent(e.target.value)} />
      <button onClick={handleCreate}>Submit</button>
    </div>
  );
}
