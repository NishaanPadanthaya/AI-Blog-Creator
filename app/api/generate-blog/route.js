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

    // Get prompt and language from request
    const { prompt, language = "English" } = await request.json();
    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    // Initialize Gemini API
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Create a more detailed prompt for better blog generation
    const enhancedPrompt = `
      Generate a professional blog post in ${language} based on the following topic: "${prompt}".

      The blog should include:
      1. An engaging title in ${language}
      2. An introduction that hooks the reader
      3. 3-5 main sections with subheadings
      4. Relevant facts and information
      5. A conclusion

      Format the response as a JSON object with the following structure:
      {
        "title": "The blog title in ${language}",
        "content": "The full blog content with markdown formatting in ${language}"
      }
    `;

    // Generate content
    const result = await model.generateContent(enhancedPrompt);
    const response = await result.response;
    const text = response.text();

    // Parse the JSON response
    // The response might be wrapped in markdown code blocks, so we need to extract the JSON
    let jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/```\n([\s\S]*?)\n```/) || text.match(/{[\s\S]*?}/);
    let blogData;

    if (jsonMatch) {
      try {
        blogData = JSON.parse(jsonMatch[1] || jsonMatch[0]);
      } catch (e) {
        // If parsing fails, try to extract the JSON manually
        const titleMatch = text.match(/"title":\s*"([^"]+)"/);
        const contentMatch = text.match(/"content":\s*"([^"]+)"/);

        if (titleMatch && contentMatch) {
          blogData = {
            title: titleMatch[1],
            content: contentMatch[1].replace(/\\n/g, '\n').replace(/\\"/g, '"')
          };
        } else {
          // If all else fails, return the raw text
          blogData = {
            title: "Generated Blog",
            content: text
          };
        }
      }
    } else {
      // If no JSON format is detected, create a simple structure
      blogData = {
        title: "Generated Blog",
        content: text
      };
    }

    return NextResponse.json({ blog: blogData });
  } catch (error) {
    console.error("Error generating blog:", error);
    return NextResponse.json({ error: "Failed to generate blog" }, { status: 500 });
  }
}
