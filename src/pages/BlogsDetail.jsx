import { useParams } from "react-router-dom";
import Loader from "../componant/Loader";
import { useBlogs } from "../hooks/useBlogs";
import { formatDate } from "../utils/date";
import CommentForm from "../componant/CommentForm"; // ✅ import CommentForm
import { useEffect, useState } from "react";
import { getComments } from "../services/googlesheets"; // ✅ fetch comments

export default function BlogDetail() {
  const { id } = useParams();
  const { blogs, loading, error } = useBlogs();
  const blog = blogs.find((b) => b.id.toString() === id);

  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);

  // Load comments for this blog
  useEffect(() => {
    if (blog) {
      getComments(blog.id)
        .then((data) => setComments(data))
        .catch((err) => console.error("Error loading comments:", err))
        .finally(() => setLoadingComments(false));
    }
  }, [blog]);

  // Callback when a new comment is added
  const handleCommentAdded = (newComment) => {
    setComments((prev) => [newComment, ...prev]);
  };

  if (loading) return <Loader />;
  if (error) return <div className="text-red-600 text-center mt-8">{error}</div>;
  if (!blog) return <div className="text-center mt-8">Blog not found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Blog Details */}
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-500 text-sm mb-6">
        By {blog.author || "Unknown"} | {blog.date && formatDate(blog.date)}
      </p>
      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full mb-6 rounded-xl shadow-md"
        />
      )}
      <p className="text-gray-700 mb-10">{blog.content}</p>

      {/* Comments Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Comments</h2>

        {/* List of comments */}
        {loadingComments ? (
          <p>Loading comments...</p>
        ) : comments.length === 0 ? (
          <p className="text-gray-500">No comments yet. Be the first!</p>
        ) : (
          <div className="space-y-4 mb-8">
            {comments.map((c, i) => (
              <div
                key={i}
                className="bg-gray-100 p-4 rounded-lg shadow-sm border"
              >
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-semibold">{c.name}</span> on{" "}
                  {formatDate(c.publishedDate)}
                </p>
                <p className="text-gray-800">{c.comment}</p>
              </div>
            ))}
          </div>
        )}

        {/* Comment Form */}
        <CommentForm blogId={blog.id} onCommentAdded={handleCommentAdded} />
      </div>
    </div>
  );
}
