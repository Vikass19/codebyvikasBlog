import { useState } from "react";
import { HiMenu, HiX, HiSearch } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import codebyvikas from "../assets/codebyvikass.png";

export default function Navbar({ blogs = [] }) {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const location = useLocation();

  const toggleMenu = () => setOpen(!open);

  // Filter blogs based on query
  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(query.toLowerCase()) ||
      blog.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <img
              src={codebyvikas}
              alt="CodeByVikas Logo"
              className="h-10 w-auto object-contain transition-transform duration-300 hover:scale-105"
            />
            <span className="ml-3 text-xl font-bold text-gray-800">
              <span className="text-olive-600">Code</span>ByVikas
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {[
              { path: "/", label: "Home" },
              { path: "/blogs", label: "Blogs" },
              { path: "/contact", label: "Contact" },
            ].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors duration-300 ${
                  location.pathname === link.path
                    ? "text-olive-700 border-b-2 border-olive-700 pb-1"
                    : "text-gray-700 hover:text-olive-700"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex items-center relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search blogs..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="border rounded-full pl-10 pr-4 py-2 w-64 focus:ring-2 focus:ring-olive-600 focus:outline-none transition-all duration-300 shadow-sm"
              />
              <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer" />
              
              {/* Search Dropdown */}
              {query && (
                <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-lg mt-2 max-h-64 overflow-y-auto z-50 animate-fadeIn">
                  {filteredBlogs.length > 0 ? (
                    filteredBlogs.map((blog) => (
                      <Link
                        key={blog.id}
                        to={`/blog/${blog.id}`}
                        onClick={() => setQuery("")}
                        className="block px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
                      >
                        {blog.title}
                      </Link>
                    ))
                  ) : (
                    <p className="px-4 py-2 text-sm text-gray-500">No results found</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Buttons */}
          <div className="md:hidden flex items-center space-x-2">
            <HiSearch
              className="text-gray-700 cursor-pointer"
              size={22}
              onClick={() => setSearchOpen(!searchOpen)}
            />
            <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
              {open ? <HiX size={28} /> : <HiMenu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      {searchOpen && (
        <div className="md:hidden bg-white px-4 py-3 shadow-md transition-all duration-300">
          <input
            type="text"
            placeholder="Search blogs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-olive-600 transition-all duration-300"
          />
          {query && (
            <div className="mt-2 bg-white shadow-lg rounded-lg max-h-64 overflow-y-auto">
              {filteredBlogs.length > 0 ? (
                filteredBlogs.map((blog) => (
                  <Link
                    key={blog.id}
                    to={`/blog/${blog.id}`}
                    onClick={() => setQuery("")}
                    className="block px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
                  >
                    {blog.title}
                  </Link>
                ))
              ) : (
                <p className="px-4 py-2 text-sm text-gray-500">No results found</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white shadow-md space-y-1 px-4 py-4 transition-all duration-300">
          {[
            { path: "/", label: "Home" },
            { path: "/blogs", label: "Blogs" },
            { path: "/contact", label: "Contact" },
          ].map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block py-2 rounded transition-colors duration-300 ${
                location.pathname === link.path
                  ? "text-olive-700 bg-gray-100 font-medium"
                  : "text-gray-700 hover:bg-gray-100 hover:text-olive-700"
              }`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
