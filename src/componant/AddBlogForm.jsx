import { useState } from "react";
import { addBlog } from "../services/googlesheets";

export default function AddBlogForm({ onAdded }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    image: "",
    author: "",
    category: "",
    publishedDate: new Date().toISOString().split("T")[0], // default today
    status: "draft" // default status
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const update = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    setMsg("");
    try {
      await addBlog(form);
      setMsg("✅ Blog Added!");
      setForm({
        title: "",
        description: "",
        content: "",
        image: "",
        author: "",
        category: "",
        publishedDate: new Date().toISOString().split("T")[0],
        status: "draft"
      });
      onAdded?.(); // refresh list
    } catch (err) {
      setMsg("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form 
      onSubmit={submit} 
      className="bg-white rounded-3xl p-6 shadow-md hover:shadow-2xl transition-shadow duration-300 space-y-4"
    >
      <h2 className="text-xl font-semibold">Add New Blog</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <input 
          name="title" value={form.title} onChange={update} placeholder="Blog Title"
          className="border rounded-xl p-3 focus:ring-2 focus:ring-black focus:outline-none"
          required 
        />
        <input 
          name="description" value={form.description} onChange={update} placeholder="Short Description"
          className="border rounded-xl p-3 focus:ring-2 focus:ring-black focus:outline-none"
        />
        <input 
          name="author" value={form.author} onChange={update} placeholder="Author Name"
          className="border rounded-xl p-3 focus:ring-2 focus:ring-black focus:outline-none"
          required
        />
        <input 
          name="image" value={form.image} onChange={update} placeholder="Featured Image URL"
          className="border rounded-xl p-3 focus:ring-2 focus:ring-black focus:outline-none"
        />
        <input 
          name="category" value={form.category} onChange={update} placeholder="Category"
          className="border rounded-xl p-3 focus:ring-2 focus:ring-black focus:outline-none"
        />
        <input 
          name="publishedDate" type="date" value={form.publishedDate} onChange={update}
          className="border rounded-xl p-3 focus:ring-2 focus:ring-black focus:outline-none"
        />
        <select
          name="status"
          value={form.status}
          onChange={update}
          className="border rounded-xl p-3 focus:ring-2 focus:ring-black focus:outline-none"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      <textarea 
        name="content" value={form.content} onChange={update} 
        placeholder="Blog Content" 
        className="border rounded-xl p-3 w-full min-h-[150px] focus:ring-2 focus:ring-black focus:outline-none"
      />

      <div className="flex items-center justify-between mt-2">
        <button 
          disabled={loading}
          className="bg-black text-white px-6 py-2 rounded-2xl font-semibold hover:bg-white hover:text-black border border-black transition-colors duration-300 disabled:opacity-60"
        >
          {loading ? "Adding..." : "Add Blog"}
        </button>
        <span className="text-sm text-gray-600">{msg}</span>
      </div>
    </form>
  );
}
