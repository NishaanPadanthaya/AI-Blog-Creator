# AI Blog Generator

A modern web application that uses AI to generate professional blog content in multiple languages. Built with Next.js, Clerk for authentication, and Google's Gemini 1.5 Flash for AI content generation.

## Features

- **AI-Powered Blog Generation**: Create high-quality blog content with Gemini 1.5 Flash
- **Multi-language Support**: Generate blogs in multiple languages including English, Spanish, French, German, and more
- **Simple Markdown Editor**: Format your content with an intuitive editor that supports headings, bold, italic, lists, and links
- **User Authentication**: Secure user authentication with Clerk
- **Blog Management**: Create, edit, and delete your blog posts
- **Dark Theme**: Modern dark-themed UI with colorful accents and smooth animations

## Tech Stack

- **Frontend**:
  - Next.js 14 - React framework for server-rendered applications
  - Tailwind CSS - Utility-first CSS framework
  
- **Authentication**:
  - Clerk - Complete user management and authentication solution

- **AI Integration**:
  - Google Gemini 1.5 Flash - Advanced AI model for content generation
  - Multi-language support for blog generation

- **Storage**:
  - Client-side storage (localStorage) for blog data
  - No database required for initial setup

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Google Gemini API key (get one from [Google AI Studio](https://ai.google.dev/))
- Clerk account and API keys (sign up at [clerk.com](https://clerk.com/))

### Installation

   ```

Install dependencies:
   ```bash
   npm install
   ```

  Run the development server:
   ```bash
   npm run dev
   ```

 
### For Production Deployment

1. Build the application for production:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```
Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.


