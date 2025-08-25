import React, { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaYoutube, FaArrowUp } from "react-icons/fa";

const Footer = () => {
  const [showScroll, setShowScroll] = useState(false);

  // Show button when user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-gray-100 text-gray-700 mt-12 border-t border-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12 grid sm:grid-cols-2 md:grid-cols-4 gap-10">
        
        {/* About */}
        <div>
          <h3 className="text-xl font-bold mb-3 text-black">CodeByVikas</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Sharing coding tutorials, projects, and tech insights for developers.
            Learn, grow, and build awesome projects with me.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-3 text-black">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {["Home", "Blogs", "Projects", "About Me", "Contact"].map((link) => (
              <li key={link}>
                <a
                  href={`/${link.toLowerCase().replace(" ", "")}`}
                  className="hover:text-black transition-colors"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h4 className="font-semibold mb-3 text-black">Follow Me</h4>
          <div className="flex space-x-4 text-xl">
            <a
              href="https://github.com/Vikass19"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-black transition"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/vikas-bansode-324467229/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-700 transition"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://youtube.com/@codebyvikas"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-red-600 transition"
            >
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-semibold mb-3 text-black">Subscribe</h4>
          <p className="text-sm text-gray-600 mb-3">
            Get updates on new blogs and projects.
          </p>
          <div className="flex flex-col space-y-2">
            <input
              type="email"
              placeholder="Your email"
              className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none text-sm"
            />
            <button className="w-full bg-black text-white py-2 rounded-lg text-sm hover:bg-white hover:text-black border border-black transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="bg-gray-200 text-center py-4 text-sm text-gray-600 relative">
        © {new Date().getFullYear()} CodeByVikas. All rights reserved.
      </div>

      {/* Scroll To Top Button */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition"
        >
          <FaArrowUp size={18} />
        </button>
      )}
    </footer>
  );
};

export default Footer;
