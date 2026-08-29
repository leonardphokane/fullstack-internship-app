import api from "../api";
import { Post } from "shared/types";

// Fetch all posts
export async function getPosts(): Promise<Post[]> {
  const res = await api.get<Post[]>("/posts");
  return res.data;
}

// Fetch only the logged-in user's posts
export async function getMyPosts(): Promise<Post[]> {
  const res = await api.get<Post[]>("/myposts");
  return res.data;
}
