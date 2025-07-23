"use client";

import { useState, useEffect } from "react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { getBlogs, deleteBlog } from "../../lib/db";

export default function Dashboard() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load blogs from localStorage
    const loadBlogs = () => {
      const userBlogs = getBlogs();
      setBlogs(userBlogs);
      setIsLoading(false);
    };

    loadBlogs();
  }, []);

  const handleDeleteBlog = (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      deleteBlog(id);
      setBlogs(blogs.filter(blog => blog.id !== id));
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark to-dark-light text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 text-transparent bg-clip-text">AI Blog Generator</h1>
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="text-gray-300 hover:text-indigo-400 transition-colors">
              Dashboard
            </Link>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 animate-fade-in">
        <div className="flex justify-between items-center mb-8 animate-slide-up" style={{animationDelay: '0.1s'}}>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 text-transparent bg-clip-text">Your Blogs</h2>
          <Link href="/dashboard/create" className="btn-accent">
            Create New Blog
          </Link>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your blogs...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" id="blog-list">
            {blogs.length > 0 ? (
              blogs.map((blog, index) => (
                <div key={blog.id} className="card flex flex-col h-full animate-slide-up" style={{animationDelay: `${0.1 + index * 0.05}s`}}>
                  {/* Image display removed */}
                  <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                  <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
                    {blog.content.substring(0, 150)}...
                  </p>
                  <div className="flex gap-2 mt-auto">
                    <Link
                      href={`/dashboard/edit/${blog.id}`}
                      className="btn-secondary flex-1 text-center"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteBlog(blog.id)}
                      className="bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold py-2 px-4 rounded-md hover:from-red-700 hover:to-pink-700 transition-all border border-red-700 transform hover:-translate-y-1 active:translate-y-0"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="card flex flex-col h-full col-span-full md:col-span-1 animate-slide-up" style={{animationDelay: '0.1s'}}>
                <div className="text-center p-12 bg-gray-100 rounded-md mb-4">
                  <p className="text-gray-500">No blogs yet</p>
                </div>
                <h3 className="text-xl font-semibold mb-2">Create your first blog</h3>
                <p className="text-gray-600 mb-4 flex-grow">
                  Get started by creating your first AI-generated blog post.
                </p>
                <Link href="/dashboard/create" className="btn-accent text-center">
                  Create Blog
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
