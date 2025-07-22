import { connectToDatabase } from "@/lib/db";
import Video from "@/models/Video";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    const videos = await Video.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, videos });
  } catch (error) {
    console.error("Feed fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch feed" },
      { status: 500 }
    );
  }
}
