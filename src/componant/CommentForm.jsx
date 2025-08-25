import React, { useState } from "react";
import { addComment } from "../services/googlesheets";

const CommentForm = ({ blogId, onCommentAdded }) => {
  const [form, setForm] = useState({ name: "", email: "", comment: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const newComment = {
        blogId,
        ...form,
        publishedDate: new Date().toISOString(),
      };
      await addComment(newComment);
      onCommentAdded(newComment); // update UI
      setForm({ name: "", email: "", comment: "" }); // clear form
    } catch (err) {
      console.error("addComment error:", err);
      setError("Failed to post comment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Leave a Comment</h2>

      {error && <p className="text-red-600 mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-black focus:outline-none"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-black focus:outline-none"
            required
          />
        </div>

        {/* Comment */}
        <div>
          <label
            htmlFor="comment"
            className="block text-sm font-medium text-gray-700"
          >
            Comment
          </label>
          <textarea
            id="comment"
            name="comment"
            rows="4"
            value={form.comment}
            onChange={handleChange}
            placeholder="Write your comment..."
            className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-black focus:outline-none"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
        >
          {loading ? "Posting..." : "Post Comment"}
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
