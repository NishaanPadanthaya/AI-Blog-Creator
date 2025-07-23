import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API
export const initGemini = () => {
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Google Gemini API key is not defined");
  }
  
  return new GoogleGenerativeAI(apiKey);
};

// Generate blog content
export const generateBlogContent = async (prompt) => {
  try {
    const genAI = initGemini();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const enhancedPrompt = `
      Generate a professional blog post based on the following topic: "${prompt}".
      
      The blog should include:
      1. An engaging title
      2. An introduction that hooks the reader
      3. 3-5 main sections with subheadings
      4. Relevant facts and information
      5. A conclusion
      
      Format the response as a JSON object with the following structure:
      {
        "title": "The blog title",
        "content": "The full blog content with markdown formatting"
      }
    `;
    
    const result = await model.generateContent(enhancedPrompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse the JSON response
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
    
    return blogData;
  } catch (error) {
    console.error("Error generating blog content:", error);
    throw error;
  }
};

// Generate image description
export const generateImageDescription = async (prompt) => {
  try {
    const genAI = initGemini();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const enhancedPrompt = `
      Generate a high-quality, professional image for a blog post about: "${prompt}".
      The image should be visually appealing and relevant to the topic.
      Please provide a detailed description of what the image should look like.
    `;
    
    const result = await model.generateContent(enhancedPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating image description:", error);
    throw error;
  }
};
