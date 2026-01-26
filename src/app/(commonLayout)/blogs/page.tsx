"use client";
import { getBlogs } from "@/actions/blog.action";
import { useEffect, useState } from "react";

export default function blog() {
  const [data, setData] = useState();
  const [error, setError] = useState();
  console.log(data);
  useEffect(() => {
    async () => {
      const { data , error } = await getBlogs();
      setData(data);
      setError(error)
    };
  }, []);
  return <h2>Hellow blog page</h2>;
}
