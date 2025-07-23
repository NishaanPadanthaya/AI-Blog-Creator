"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function BlogPreview({ blog, onSave, showSaveButton = false }) {
  const { title, content } = blog || { title: "", content: "" };
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (onSave) {
      setIsSaving(true);
      try {
        await onSave();
      } catch (error) {
        console.error("Error saving blog:", error);
      } finally {
        setIsSaving(false);
      }
    }
  };

  if (!blog) {
    return (
      <div className="card text-center p-12">
        <p className="text-gray-500">No blog to preview</p>
      </div>
    );
  }

  return (
    <div className="card animate-fade-in">
      <div className="mb-4">
        {/* Image display removed */}
        <h1 className="text-2xl font-bold mb-4 animate-slide-up" style={{animationDelay: '0.1s'}}>{title}</h1>
        <div className="max-w-none animate-slide-up text-white blog-content" style={{animationDelay: '0.2s'}}>
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>

      {showSaveButton && (
        <button
          className="btn-primary w-full animate-slide-up"
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save Blog"}
        </button>
      )}
    </div>
  );
}
