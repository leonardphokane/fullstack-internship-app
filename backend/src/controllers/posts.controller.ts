import { Request, Response } from "express";
import { Post, UpdateResponse } from "shared/types";   // ✅ shared alias

// GET /posts
export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts: Post[] = await PostRepository.find({ relations: ["author"] });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

// PUT /posts/:id
export const updatePost = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { title, content } = req.body;

    const post = await PostRepository.findOneBy({ id });
    if (!post) return res.status(404).json({ error: "Post not found" });

    post.title = title;
    post.content = content;
    await PostRepository.save(post);

    const response: UpdateResponse = { post };
    res.json(response);
  } catch (err) {
    res.status(500).json({ error: "Failed to update post" });
  }
};
