import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

// In a real application, this would save to a database
// For this example, we'll use a simple in-memory store
let blogs = [];

export async function POST(request) {
  try {
    // Check authentication
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get blog data from request
    const { title, content, imageUrl } = await request.json();
    
    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
    }

    // Create a new blog
    const newBlog = {
      id: uuidv4(),
      userId,
      title,
      content,
      imageUrl: imageUrl || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // In a real app, this would save to a database
    // For now, we'll use a client-side approach with localStorage
    // This API endpoint will just return the blog data to be saved on the client

    return NextResponse.json({ blog: newBlog });
  } catch (error) {
    console.error("Error saving blog:", error);
    return NextResponse.json({ error: "Failed to save blog" }, { status: 500 });
  }
}
