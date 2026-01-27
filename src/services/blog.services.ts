import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;
interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

interface GetBlogsParams {
  isFeatured?: boolean;
  search?: string;
}
interface BlogData {
  title: string;
  content: string;
  tags?: string[];
}
export const blogService = {
  getBlogPost: async function (
    params?: GetBlogsParams,
    options?: ServiceOptions,
  ) {
    try {
      const url = new URL(`${API_URL}/post`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value);
          }
        });
      }

      const config: RequestInit = {};

      if (options?.cache) {
        config.cache = options.cache;
      }

      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }
      config.next = { ...config.next, tags: ["blogPosts"] };

      const res = await fetch(`${API_URL}/post`, config);
      const data = await res.json();

      return { data: data, error: null };
    } catch (error) {
      return {
        data: null,
        error: { message: "something went wrong", error },
      };
    }
  },
  getBlogById: async function (id: string) {
    try {
      const res = await fetch(`${API_URL}/post/${id}`);
      const data = await res.json();
      return { data: data, error: null };
    } catch (error) {
      return {
        data: null,
        error: { message: "something went wrong", error },
      };
    }
  },
  createBlogPost: async (blogData: BlogData) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(blogData),
      });
      const data = await res.json();
      if (data.error) {
        return {
          data: null,
          error: { error: " post not create" },
        };
      }
      return { data: data, error: null };
    } catch (error) {
      return {
        data: null,
        error: { message: "something went wrong", error },
      };
    }
  },
};
