"use client";

import { useState, useEffect } from "react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BlogPreview from "../../../../components/BlogPreview";
import BlogEditor from "../../../../components/BlogEditor";
import { getBlogById, updateBlog } from "../../../../lib/db";

export default function EditBlog({ params }) {
  const router = useRouter();
  const { id } = params;

  const [isLoading, setIsLoading] = useState(true);
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const foundBlog = getBlogById(id);

        if (foundBlog) {
          setBlog(foundBlog);
        } else {
          setError("Blog not found");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load blog");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const saveBlog = async (updatedBlogData) => {
    try {
      const updatedBlog = {
        ...updatedBlogData,
        updatedAt: new Date().toISOString(),
      };

      const result = updateBlog(id, updatedBlog);

      if (result) {
        router.push("/dashboard");
      } else {
        throw new Error("Failed to update blog");
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-light flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blog...</p>
        </div>
      </div>
    );
  }

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
        <div className="mb-8 animate-slide-left" style={{animationDelay: '0.1s'}}>
          <Link href="/dashboard" className="text-indigo-400 hover:text-indigo-300 hover:underline flex items-center transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Dashboard
          </Link>
        </div>

        <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 text-transparent bg-clip-text mb-6 animate-slide-up" style={{animationDelay: '0.2s'}}>Edit Blog</h2>

        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-md mb-4">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8 animate-fade-in" style={{animationDelay: '0.3s'}}>
          <div className="animate-slide-left" style={{animationDelay: '0.4s'}}>
            <h3 className="text-xl font-semibold mb-4">Edit Blog</h3>
            <BlogEditor
              blog={blog}
              onSave={saveBlog}
              isLoading={isLoading}
            />
          </div>

          <div className="animate-slide-right" style={{animationDelay: '0.5s'}}>
            <h3 className="text-xl font-semibold mb-4">Preview</h3>
            {blog && (
              <BlogPreview
                blog={blog}
                showSaveButton={false}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
