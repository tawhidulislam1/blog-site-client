"use server";

import { blogService } from "@/services/blog.services";

export const getBlogs = async () => {
  return await blogService.getBlogPost();
};
