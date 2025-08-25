import React from "react";
import BlogCard from "../componant/BlogCard";
import Loader from "../componant/Loader";
import { useBlogs } from "../hooks/useBlogs";

const BlogsPage = () => {
  const { blogs, loading, error } = useBlogs();

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Blogs</h1>

      {loading && <Loader />}

      {error && !loading && (
        <div className="text-red-600 text-center mt-8">{error}</div>
      )}

      {!loading && !error && blogs.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      )}

      {!loading && !error && blogs.length === 0 && (
        <div className="text-center text-gray-500 mt-8">No blogs found.</div>
      )}
    </div>
  );
};

export default BlogsPage;
