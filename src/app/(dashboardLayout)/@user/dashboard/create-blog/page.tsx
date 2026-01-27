import { CreateBlogFormClient } from "@/components/modules/user/createBlog/CreateBlogFormClient";
import CreateBlogFormServer from "@/components/modules/user/createBlog/createBlogFormServer";

export default function createBlogPage() {
  return (
    <div>
          {/* <CreateBlogFormServer /> */}
          <CreateBlogFormClient/>
    </div>
  );
}
