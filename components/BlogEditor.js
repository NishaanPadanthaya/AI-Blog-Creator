"use client";

import { useState, useEffect } from 'react';
import RichTextEditor from './RichTextEditor';

export default function BlogEditor({ blog, onSave, isLoading = false }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (blog) {
      setTitle(blog.title || '');
      setContent(blog.content || '');
    }
  }, [blog]);

  const handleSave = async () => {
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    if (!content.trim()) {
      setError('Content is required');
      return;
    }

    setIsSaving(true);
    setError('');

    try {
      await onSave({ title, content });
    } catch (err) {
      console.error(err);
      setError('Failed to save blog. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="card animate-pulse">
        <div className="h-8 bg-gray-700 rounded w-3/4 mb-4"></div>
        <div className="h-64 bg-gray-700 rounded mb-4"></div>
        <div className="h-10 bg-gray-700 rounded"></div>
      </div>
    );
  }

  return (
    <div className="card animate-fade-in">
      {error && (
        <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-md mb-4">
          {error}
        </div>
      )}
      
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-300 mb-2">
          Blog Title
        </label>
        <input
          type="text"
          id="title"
          className="input"
          placeholder="Enter blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      
      <div className="mb-6">
        <label htmlFor="content" className="block text-gray-300 mb-2">
          Blog Content
        </label>
        <RichTextEditor
          value={content}
          onChange={setContent}
          placeholder="Enter blog content"
        />
      </div>
      
      <button
        className="btn-primary w-full animate-slide-up"
        onClick={handleSave}
        disabled={isSaving}
      >
        {isSaving ? "Saving..." : "Save Blog"}
      </button>
    </div>
  );
}
