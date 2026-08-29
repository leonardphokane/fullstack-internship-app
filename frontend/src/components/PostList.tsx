import React, { useEffect, useState } from "react";
import api from "../api";
import { Post, UpdateResponse } from "shared/types";   // ✅ updated import

export default function PostList({ token }: { token: string }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [viewMine, setViewMine] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError("");
      try {
        const endpoint = viewMine ? "/my-posts" : "/posts";
        const res = await api.get<Post[]>(endpoint, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(res.data);
      } catch {
        setError("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [token, viewMine]);

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(posts.filter((p) => p.id !== id));
    } catch {
      setError("Failed to delete post");
    }
  };

  const startEdit = (post: Post) => {
    setEditingId(post.id);
    setEditTitle(post.title);
    setEditContent(post.content);
  };

  const handleUpdate = async (id: number) => {
    try {
      const updated = { title: editTitle, content: editContent };
      const res = await api.put<UpdateResponse>(`/posts/${id}`, updated, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(posts.map((p) => (p.id === id ? res.data.post : p)));
      setEditingId(null);
      setEditTitle("");
      setEditContent("");
    } catch {
      setError("Failed to update post");
    }
  };

  return (
    <div>
      <h2>{viewMine ? "My Posts" : "All Posts"}</h2>
      <button onClick={() => setViewMine(!viewMine)}>
        {viewMine ? "View All Posts" : "View My Posts"}
      </button>

      {loading && <p>Loading posts...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && posts.length === 0 && <p>No posts found.</p>}

      {posts.map((p) => (
        <div key={p.id} style={{ border: "1px solid #ccc", margin: "8px", padding: "8px" }}>
          {editingId === p.id ? (
            <>
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Title"
              />
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                placeholder="Content"
              />
              <div>
                <button onClick={() => handleUpdate(p.id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </div>
            </>
          ) : (
            <>
              <h3>{p.title}</h3>
              <p>{p.content}</p>
              {/* ✅ Guard against undefined author */}
              <small>By {p.author ? p.author.email : "Unknown"}</small>
              <div style={{ marginTop: "8px" }}>
                <button onClick={() => startEdit(p)}>Edit</button>
                <button onClick={() => handleDelete(p.id)} style={{ marginLeft: "8px" }}>
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
