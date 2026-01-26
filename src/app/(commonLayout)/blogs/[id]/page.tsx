import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { blogService } from "@/services/blog.services";
import { BlogPost } from "@/types/blog.type";
import Image from "next/image";
export async function generateStaticParams() {
  const { data } = await blogService.getBlogPost();

  return data?.result?.data
    .map((blog: BlogPost) => ({ id: blog.id }))
    .splice(0, 3);
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data } = await blogService.getBlogById(id);
  const post = data.result;
  return (
    <div className="container mx-auto px-4 py-10">
      <Card className="max-w-4xl mx-auto">
        {/* Thumbnail */}
        {post.thumbnail && (
          <div className="relative h-[300px] w-full">
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              className="object-cover rounded-t-lg"
            />
          </div>
        )}

        <CardHeader>
          <CardTitle className="text-3xl font-bold">{post.title}</CardTitle>

          <div className="flex flex-wrap gap-2 mt-2">
            {post.tags.map((tag: string) => (
              <Badge key={tag} variant="secondary">
                #{tag}
              </Badge>
            ))}
          </div>

          <p className="text-sm text-muted-foreground mt-2">
            Published on{" "}
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            · 👀 {post.views} views
          </p>
        </CardHeader>

        <CardContent>
          <div className="prose max-w-none">{post.content}</div>
        </CardContent>
      </Card>
    </div>
  );
}
