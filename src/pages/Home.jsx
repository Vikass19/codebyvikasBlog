import React from "react";
import { useBlogs } from "../hooks/useBlogs";
import BlogCard from "../componant/BlogCard";
import { MdOutlineLibraryBooks, MdOutlineMail } from "react-icons/md";
import { FiCode } from "react-icons/fi";
const Home = () => {
  const { blogs, loading, error } = useBlogs();

  const jobBlogs = blogs.filter((b) => b.category === "job").slice(0, 3);
  const tutorialBlogs = blogs.filter((b) => b.category === "tutorial").slice(0, 3);

  const youtubeVideos = [
    "dQw4w9WgXcQ",
    "akbF37hnSeo",
    "nDfSxbEHsG4",
     "y8y5-P98zP8",
  "p7Z7RDl8p0E",
  "vxU5-_HJ_i8"
  ];

  return (
    <div className="bg-gray-50 min-h-screen text-gray-900">
      

{/* Hero Section */}
<section className="relative bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white overflow-hidden">
  {/* Decorative background shapes */}
  <div className="absolute -top-20 -left-20 w-72 h-72 bg-gray-700/30 rounded-full blur-3xl animate-pulse"></div>
  <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-600/20 rounded-full blur-3xl animate-pulse delay-2000"></div>

  <div className="relative max-w-7xl mx-auto px-6 py-28 flex flex-col md:flex-row items-center justify-between">
    {/* Left Content */}
    <div className="md:w-1/2 space-y-8 animate-fadeIn">
      <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
        <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
          Discover Jobs
        </span>
        <br />
        <span className="bg-gradient-to-r from-gray-300 via-gray-100 to-white bg-clip-text text-transparent">
          & Tutorials
        </span>
      </h1>
      <p className="text-lg md:text-xl text-gray-300 max-w-lg">
        Stay ahead with the latest 
        <span className="font-semibold text-white"> hiring updates </span> and 
        <span className="font-semibold text-white"> coding tutorials </span> crafted for developers like you. 
        Learn, grow, and land your dream IT job.
      </p>
      
      {/* CTA Buttons */}
      <div className="flex space-x-4">
        <a
          href="/blogs"
          className="flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-full shadow-lg hover:shadow-2xl hover:bg-gray-200 transition-all duration-300"
        >
          <MdOutlineLibraryBooks size={22} />
          <span>Explore Blogs</span>
        </a>
        <a
          href="/contact"
          className="flex items-center gap-2 px-6 py-3 border border-white text-white font-semibold rounded-full hover:bg-white hover:text-black transition-all duration-300"
        >
          <MdOutlineMail size={22} />
          <span>Contact</span>
        </a>
      </div>
    </div>

    {/* Right Content - Floating Image with Glass Effect */}
    <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center relative">
      <div className="absolute -inset-4 bg-white/10 rounded-3xl blur-xl animate-pulse"></div>
      <img
        src="https://images.unsplash.com/photo-1536148935331-408321065b18?w=800&auto=format&fit=crop&q=80"
        alt="Coding illustration"
        className="relative w-full max-w-md rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
      />
      {/* Floating code snippet card */}
      <div className="absolute -top-10 -right-6 bg-white/10 backdrop-blur-lg text-gray-200 px-4 py-3 rounded-2xl shadow-lg animate-bounce hidden md:block">
        <code className="flex items-center gap-2 text-sm">
          <FiCode size={18} /> console.log("Hello Dev")
        </code>
      </div>
    </div>
  </div>
</section>


      {/* Jobs Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-4"> Latest Job Posts</h2>
        <hr className="border-gray-300 mb-8" />
        {loading && <div className="text-gray-500">Loading jobs…</div>}
        {error && <div className="text-red-600">{error}</div>}
        {jobBlogs.length === 0 && !loading ? (
          <p className="text-gray-500 italic">No job posts available yet.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {jobBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}
        <div className="mt-8 text-center">
          <a
            href="/blogs?category=job"
            className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors duration-300"
          >
            View All Jobs
          </a>
        </div>
      </section>

      {/* Tutorials Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 bg-white rounded-3xl shadow-sm">
        <h2 className="text-3xl font-bold mb-4"> Latest Coding Tutorials</h2>
        <hr className="border-gray-300 mb-8" />
        {tutorialBlogs.length === 0 && !loading ? (
          <p className="text-gray-500 italic">No tutorials available yet.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {tutorialBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}
        <div className="mt-8 text-center">
          <a
            href="/blogs?category=tutorial"
            className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors duration-300"
          >
            View All Tutorials
          </a>
        </div>
      </section>

      {/* YouTube Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-4"> Latest YouTube Videos</h2>
        <hr className="border-gray-300 mb-8" />
        <div className="grid md:grid-cols-3 gap-6">
          {youtubeVideos.map((vid) => (
            <div
              key={vid}
              className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <iframe
                className="w-full h-60"
                src={`https://www.youtube.com/embed/${vid.replace("https://youtu.be/", "")}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <a
            href="https://www.youtube.com/@codebyvikas"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors duration-300"
          >
            Subscribe on YouTube
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
