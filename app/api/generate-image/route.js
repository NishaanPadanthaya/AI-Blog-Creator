import { GoogleGenerativeAI } from "@google/generative-ai";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Check authentication
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get prompt from request
    const { prompt } = await request.json();
    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    // Initialize Gemini API
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Create a more detailed prompt for better image generation
    const enhancedPrompt = `
      Generate a high-quality, professional image for a blog post about: "${prompt}".
      The image should be visually appealing and relevant to the topic.
      Please provide a detailed description of what the image should look like.
    `;

    // Generate image description
    const result = await model.generateContent(enhancedPrompt);
    const response = await result.response;
    const imageDescription = response.text();

    // For now, we'll use a placeholder image service since direct image generation
    // might require additional setup with Gemini or other services
    const imageUrl = `https://source.unsplash.com/random/800x600/?${encodeURIComponent(prompt)}`;

    return NextResponse.json({ 
      imageUrl,
      imageDescription
    });
  } catch (error) {
    console.error("Error generating image:", error);
    return NextResponse.json({ error: "Failed to generate image" }, { status: 500 });
  }
}
