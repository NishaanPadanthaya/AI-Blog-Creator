"use client";

// This is a simple client-side storage solution
// In a real application, you would use a database

// Get all blogs for the current user
export const getBlogs = () => {
  if (typeof window === "undefined") {
    return [];
  }
  
  try {
    const blogsJson = localStorage.getItem("blogs");
    return blogsJson ? JSON.parse(blogsJson) : [];
  } catch (error) {
    console.error("Error getting blogs:", error);
    return [];
  }
};

// Get a single blog by ID
export const getBlogById = (id) => {
  if (typeof window === "undefined") {
    return null;
  }
  
  try {
    const blogs = getBlogs();
    return blogs.find(blog => blog.id === id) || null;
  } catch (error) {
    console.error("Error getting blog by ID:", error);
    return null;
  }
};

// Save a new blog
export const saveBlog = (blog) => {
  if (typeof window === "undefined") {
    return null;
  }
  
  try {
    const blogs = getBlogs();
    const newBlog = {
      ...blog,
      id: blog.id || crypto.randomUUID(),
      createdAt: blog.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const updatedBlogs = [...blogs, newBlog];
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
    
    return newBlog;
  } catch (error) {
    console.error("Error saving blog:", error);
    return null;
  }
};

// Update an existing blog
export const updateBlog = (id, updatedBlog) => {
  if (typeof window === "undefined") {
    return null;
  }
  
  try {
    const blogs = getBlogs();
    const blogIndex = blogs.findIndex(blog => blog.id === id);
    
    if (blogIndex === -1) {
      return null;
    }
    
    const updatedBlogs = [...blogs];
    updatedBlogs[blogIndex] = {
      ...blogs[blogIndex],
      ...updatedBlog,
      updatedAt: new Date().toISOString(),
    };
    
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
    
    return updatedBlogs[blogIndex];
  } catch (error) {
    console.error("Error updating blog:", error);
    return null;
  }
};

// Delete a blog
export const deleteBlog = (id) => {
  if (typeof window === "undefined") {
    return false;
  }
  
  try {
    const blogs = getBlogs();
    const updatedBlogs = blogs.filter(blog => blog.id !== id);
    
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
    
    return true;
  } catch (error) {
    console.error("Error deleting blog:", error);
    return false;
  }
};
