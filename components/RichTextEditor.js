"use client";

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

export default function RichTextEditor({ value, onChange, placeholder }) {
  const [mounted, setMounted] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-64 bg-gray-700 animate-pulse rounded-md"></div>;
  }

  const insertAtCursor = (textToInsert) => {
    const textarea = document.querySelector('.rich-text-editor textarea');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);

    // If text is selected, wrap it with formatting
    if (selectedText) {
      const textBefore = value.substring(0, start);
      const textAfter = value.substring(end);

      // Determine what to wrap the selected text with
      let wrappedText = '';
      if (textToInsert === '**') {
        wrappedText = `**${selectedText}**`;
      } else if (textToInsert === '*') {
        wrappedText = `*${selectedText}*`;
      } else if (textToInsert === '[](url)') {
        wrappedText = `[${selectedText}](https://example.com)`;
      } else {
        wrappedText = textToInsert.replace('Text', selectedText);
      }

      onChange(textBefore + wrappedText + textAfter);
    } else {
      // No text selected, just insert at cursor
      const newText = value.substring(0, start) + textToInsert + value.substring(end);
      onChange(newText);

      // Set cursor position after the inserted text
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + textToInsert.length, start + textToInsert.length);
      }, 0);
    }
  };

  const handleBold = () => {
    insertAtCursor('**');
  };

  const handleItalic = () => {
    insertAtCursor('*');
  };

  const handleHeading = () => {
    insertAtCursor('\n## Heading\n');
  };

  const handleList = () => {
    insertAtCursor('\n- List item 1\n- List item 2\n- List item 3\n');
  };

  const handleLink = () => {
    insertAtCursor('[](url)');
  };

  return (
    <div className="rich-text-editor">
      <div className="flex flex-wrap justify-between gap-2 mb-2 p-2 bg-gray-800 rounded-t-md border border-gray-700">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleHeading}
            className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-white text-sm"
            title="Add Heading"
            disabled={isPreview}
          >
            Heading
          </button>
          <button
            type="button"
            onClick={handleBold}
            className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-white text-sm font-bold"
            title="Bold"
            disabled={isPreview}
          >
            B
          </button>
          <button
            type="button"
            onClick={handleItalic}
            className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-white text-sm italic"
            title="Italic"
            disabled={isPreview}
          >
            I
          </button>
          <button
            type="button"
            onClick={handleList}
            className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-white text-sm"
            title="Bullet List"
            disabled={isPreview}
          >
            List
          </button>
          <button
            type="button"
            onClick={handleLink}
            className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-white text-sm"
            title="Add Link"
            disabled={isPreview}
          >
            Link
          </button>
        </div>
        <button
          type="button"
          onClick={() => setIsPreview(!isPreview)}
          className={`px-2 py-1 ${isPreview ? 'bg-indigo-600' : 'bg-gray-700 hover:bg-gray-600'} rounded text-white text-sm`}
          title={isPreview ? "Edit" : "Preview"}
        >
          {isPreview ? "Edit" : "Preview"}
        </button>
      </div>

      {isPreview ? (
        <div className="textarea min-h-[300px] rounded-t-none overflow-auto blog-content p-4">
          <ReactMarkdown>{value}</ReactMarkdown>
        </div>
      ) : (
        <textarea
          className="textarea min-h-[300px] rounded-t-none"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      )}
      <div className="mt-2 text-xs text-gray-400">
        <p>Formatting: <span className="font-bold">**Bold**</span>, <span className="italic">*Italic*</span>, ## Heading, - List item, [Link](url)</p>
      </div>
    </div>
  );
}
