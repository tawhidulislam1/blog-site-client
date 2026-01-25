import BlogCard from "@/components/modules/homePage/BlogCard";
import { blogService } from "@/services/blog.services";
import { BlogPost } from "@/types/blog.type";

export default async function Home() {
  const { data } = await blogService.getBlogPost(
    {
      isFeatured: false,
    },
    {
      cache: "no-store",
    },
  );


  return (
    <div className="grid grid-cols-3 max-w-7xl mx-auto px-4 gap-6">
      {data.result.data.map((post: BlogPost) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}
