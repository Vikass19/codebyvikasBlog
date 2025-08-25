import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddBlogForm from "../componant/AddBlogForm";
import { getBlogs, deleteBlog } from "../services/googlesheets"; // import your functions

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Check admin login
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) navigate("/login");
  }, [navigate]);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      setLoading(true);
      const data = await getBlogs();
      setBlogs(data);
    } catch (err) {
      console.error("Failed to load blogs", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await deleteBlog(id);
      setBlogs((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Add Blog */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Add New Blog</h2>
        <AddBlogForm onAdded={loadBlogs} />
      </section>

      {/* Blog Management */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Manage Blogs</h2>
        {loading ? (
          <p>Loading blogs...</p>
        ) : (
          <div className="space-y-4">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="p-4 bg-white rounded-lg shadow flex justify-between items-center"
              >
                <div>
                  <h3 className="font-bold">{blog.title}</h3>
                  <p className="text-sm text-gray-500">
                    {blog.category} | {blog.author}
                  </p>
                </div>
                <div className="space-x-2">
                  <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;
