import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 shadow-lg animate-fade-in">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 text-transparent bg-clip-text">AI Blog Generator</h1>
          <div className="space-x-4">
            <Link href="/sign-in" className="text-gray-300 hover:text-indigo-400 transition-colors">
              Sign In
            </Link>
            <Link href="/sign-up" className="btn-accent">
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col md:flex-row items-center justify-center px-4 py-12 md:py-24 animate-fade-in" style={{animationDelay: '0.2s'}}>
        <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8 animate-slide-left" style={{animationDelay: '0.3s'}}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 text-transparent bg-clip-text animate-pulse-slow">
            Create Professional Blogs with AI
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Generate high-quality blog content in seconds using Gemini 1.5 Flash AI.
            Create, edit, and download your blogs with ease.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/sign-up" className="btn-accent text-center">
              Get Started
            </Link>
            <Link href="#features" className="btn-primary text-center">
              Learn More
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 relative h-64 md:h-96 w-full animate-slide-right" style={{animationDelay: '0.4s'}}>
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-lg opacity-20"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-6 relative">
              {/* Animated typing effect */}
              <h3 className="text-2xl font-bold text-dark mb-6 animate-pulse">Transform Your Ideas Into Blogs</h3>

              {/* Animated icons */}
              <div className="flex justify-center items-center gap-8 flex-wrap">
                <div className="text-center transform transition-transform hover:scale-110 duration-300">
                  <div className="h-16 w-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-2 animate-bounce">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                  <p className="font-semibold text-dark">Create</p>
                </div>

                <div className="text-center transform transition-transform hover:scale-110 duration-300">
                  <div className="h-16 w-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-2 animate-bounce" style={{animationDelay: '0.2s'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="font-semibold text-dark">Visualize</p>
                </div>

                <div className="text-center transform transition-transform hover:scale-110 duration-300">
                  <div className="h-16 w-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-2 animate-bounce" style={{animationDelay: '0.4s'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                    </svg>
                  </div>
                  <p className="font-semibold text-dark">Share</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-900 py-16 animate-fade-in" style={{animationDelay: '0.6s'}}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">Features</h2>
          <div className="grid md:grid-cols-3 gap-8 animate-slide-up" style={{animationDelay: '0.7s'}}>
            <div className="card bg-gradient-to-br from-gray-800 to-gray-900 border border-indigo-900/50 hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1">
              <div className="h-16 w-16 bg-indigo-900/30 rounded-full flex items-center justify-center mb-6 mx-auto transform transition-transform hover:scale-110 duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center bg-gradient-to-r from-indigo-400 to-purple-500 text-transparent bg-clip-text">AI Blog Generation</h3>
              <p className="text-gray-300 text-center">
                Create professional blog content with a simple prompt using Gemini 1.5 Flash AI.
              </p>
            </div>
            <div className="card bg-gradient-to-br from-gray-800 to-gray-900 border border-purple-900/50 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1">
              <div className="h-16 w-16 bg-purple-900/30 rounded-full flex items-center justify-center mb-6 mx-auto transform transition-transform hover:scale-110 duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">Multi-Language Support</h3>
              <p className="text-gray-300 text-center">
                Generate blogs in multiple languages with our AI-powered translation capabilities.
              </p>
            </div>
            <div className="card bg-gradient-to-br from-gray-800 to-gray-900 border border-pink-900/50 hover:border-pink-500/50 transition-all duration-300 hover:-translate-y-1">
              <div className="h-16 w-16 bg-pink-900/30 rounded-full flex items-center justify-center mb-6 mx-auto transform transition-transform hover:scale-110 duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center bg-gradient-to-r from-pink-400 to-red-500 text-transparent bg-clip-text">Save & Edit</h3>
              <p className="text-gray-300 text-center">
                Save your blogs to your dashboard and edit them anytime with our intuitive editor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-white py-8 animate-fade-in border-t border-gray-800" style={{animationDelay: '0.9s'}}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-lg font-semibold mb-4 md:mb-0 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">AI Blog Generator</p>
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} AI Blog Generator. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
