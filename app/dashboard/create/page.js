"use client";

import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BlogPreview from "../../../components/BlogPreview";
import BlogEditor from "../../../components/BlogEditor";
import { saveBlog as saveToDb } from "../../../lib/db";

export default function CreateBlog() {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const [blogPrompt, setBlogPrompt] = useState("");
  const [language, setLanguage] = useState("English");
  const [generatedBlog, setGeneratedBlog] = useState(null);
  const [error, setError] = useState("");

  const generateBlog = async () => {
    if (!blogPrompt.trim()) {
      setError("Please enter a blog prompt");
      return;
    }

    setIsGenerating(true);
    setError("");

    try {
      const response = await fetch("/api/generate-blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: blogPrompt, language }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate blog");
      }

      const data = await response.json();
      // Convert markdown to HTML for the rich text editor
      setGeneratedBlog({
        title: data.blog.title,
        content: data.blog.content
      });
    } catch (err) {
      console.error(err);
      setError("Failed to generate blog. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Image generation removed

  const saveBlog = async (blogData) => {
    if (!generatedBlog) {
      setError("Please generate a blog first");
      return;
    }

    try {
      // Save to client-side storage
      const newBlog = {
        title: blogData.title || generatedBlog.title || "Untitled Blog",
        content: blogData.content || generatedBlog.content,
      };

      saveToDb(newBlog);
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      throw err;
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
        <div className="mb-8 animate-slide-left" style={{animationDelay: '0.1s'}}>
          <Link href="/dashboard" className="text-indigo-400 hover:text-indigo-300 hover:underline flex items-center transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Dashboard
          </Link>
        </div>

        <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 text-transparent bg-clip-text mb-6 animate-slide-up" style={{animationDelay: '0.2s'}}>Create New Blog</h2>

        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-md mb-4">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8 animate-fade-in" style={{animationDelay: '0.3s'}}>
          <div className="card animate-slide-left" style={{animationDelay: '0.4s'}}>
            <h3 className="text-xl font-semibold mb-4">Generate Blog Content</h3>
            <div className="mb-4">
              <label htmlFor="blogPrompt" className="block text-gray-300 mb-2">
                Blog Prompt
              </label>
              <textarea
                id="blogPrompt"
                className="textarea"
                placeholder="Enter a prompt for your blog (e.g., 'Write a blog post about the benefits of meditation')"
                value={blogPrompt}
                onChange={(e) => setBlogPrompt(e.target.value)}
              ></textarea>
            </div>

            <div className="mb-4">
              <label htmlFor="language" className="block text-gray-300 mb-2">
                Language
              </label>
              <select
                id="language"
                className="select"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish (Español)</option>
                <option value="French">French (Français)</option>
                <option value="German">German (Deutsch)</option>
                <option value="Italian">Italian (Italiano)</option>
                <option value="Portuguese">Portuguese (Português)</option>
                <option value="Russian">Russian (Русский)</option>
                <option value="Japanese">Japanese (日本語)</option>
                <option value="Chinese">Chinese (中文)</option>
                <option value="Hindi">Hindi (हिन्दी)</option>
                <option value="Arabic">Arabic (العربية)</option>
              </select>
            </div>
            <button
              className="btn-primary w-full"
              onClick={generateBlog}
              disabled={isGenerating}
            >
              {isGenerating ? "Generating..." : "Generate Blog"}
            </button>

            {/* Image generation section removed */}

            {/* Save button moved to BlogPreview component */}
          </div>

          <div className="animate-slide-right" style={{animationDelay: '0.5s'}}>
            <h3 className="text-xl font-semibold mb-4">Preview</h3>
            {generatedBlog ? (
              <div className="space-y-6">
                <BlogPreview
                  blog={generatedBlog}
                  showSaveButton={false}
                />
                <BlogEditor
                  blog={generatedBlog}
                  onSave={saveBlog}
                />
              </div>
            ) : (
              <div className="card text-center p-12">
                <p className="text-gray-400">
                  Your blog preview will appear here after generation
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
