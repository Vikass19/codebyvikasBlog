import React from "react";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      {/* Animated Blog Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-md animate-pulse overflow-hidden flex flex-col"
          >
            <div className="h-48 w-full bg-gray-300"></div>
            <div className="p-4 flex-1 flex flex-col space-y-2">
              <div className="h-6 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              <div className="mt-auto flex items-center justify-between text-xs text-gray-400">
                <div className="h-3 w-1/4 bg-gray-300 rounded"></div>
                <div className="h-3 w-1/6 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Loader text */}
      <p className="mt-8 text-gray-500 text-lg animate-pulse">
        Loading Blogs...
      </p>
    </div>
  );
};

export default Loader;
