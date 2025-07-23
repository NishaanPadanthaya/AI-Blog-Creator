import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Check authentication
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // In a real app, this would fetch from a database
    // For now, we'll use a client-side approach with localStorage
    // This API endpoint will just return an empty array
    // The actual data will be managed on the client side

    return NextResponse.json({ blogs: [] });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}
