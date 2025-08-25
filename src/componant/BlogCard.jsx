import { Link } from "react-router-dom";
import { formatDate } from "../utils/date";

export default function BlogCard({ blog }) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-2 flex flex-col">
      
      {/* Blog Image + Category */}
      <div className="relative overflow-hidden">
        <img
          src={blog.image || "https://via.placeholder.com/600x400?text=No+Image"}
          alt={blog.title || "Untitled"}
          className="w-full h-60 object-cover transition-transform duration-500 ease-in-out transform hover:scale-105"
        />
        {blog.category && (
          <div className="absolute top-2 left-2 bg-blue-600 text-white px-3 py-1 rounded opacity-90 text-xs font-medium">
            #{blog.category}
          </div>
        )}
      </div>

      {/* Blog Info */}
      <div className="p-4 flex flex-col flex-1">
        <Link
          to={`/blog/${blog.id}`}
          className="text-lg font-semibold truncate hover:text-blue-600 transition-colors"
        >
          {blog.title || "Untitled"}
        </Link>

        {blog.description && (
          <p className="text-sm text-gray-500 mt-1 line-clamp-3">{blog.description}</p>
        )}

        {/* Author & Date */}
        <div className="mt-3 flex justify-between items-center text-gray-600 text-sm">
          <span>{blog.author || "Unknown Author"}</span>
          {blog.date && <span>{formatDate(blog.date)}</span>}
        </div>

        {/* Read More button */}
        <div className="mt-4">
          <Link
            to={`/blog/${blog.id}`}
            className="inline-block px-6 py-2 bg-black text-white rounded-full font-semibold hover:bg-white hover:text-black border border-black transition-colors duration-300"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
}
