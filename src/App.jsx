import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./componant/Navbar";
import Footer from "./componant/Footer";
import Home from "./pages/Home";
import Blogs from "./pages/BlogsPage";
import BlogDetail from "./pages/BlogsDetail";
import Login from "./componant/Login";
import AdminDashboard from "./pages/AdminDashboard";
import { useBlogs } from "./hooks/useBlogs";

function App() {
  const { blogs, loading, error } = useBlogs(); // use your custom hook

  return (
    <BrowserRouter>
      {/* Pass blogs to Navbar for search */}
      <Navbar blogs={blogs} />

      <div className="min-h-[calc(100vh-64px-100px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs blogs={blogs} loading={loading} error={error} />} />
          <Route path="/blog/:id" element={<BlogDetail blogs={blogs} loading={loading} error={error} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
