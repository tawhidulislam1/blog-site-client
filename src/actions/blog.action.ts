"use server";

import { BlogData } from "@/constants/BlogData";
import { blogService } from "@/services/blog.services";
import { updateTag } from "next/cache";

export const getBlogs = async () => {
  return await blogService.getBlogPost();
};
export const createBlogPost = async (data: BlogData) => {
  const res = await blogService.createBlogPost(data);
  updateTag("blogPosts");
  return res;
};
