// MarkdownRenderer.js
import React from 'react';
import ReactMarkdown from 'react-markdown';

export default function MarkdownRenderer({ markdownContent }) {
  return (
    <div className="markdown-container">
    <ReactMarkdown children={markdownContent} />
  </div>
  )
}

