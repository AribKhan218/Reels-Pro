import { connectToDatabase } from "@/lib/db";
import Video, { IVideo } from "@/models/Video";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authoptions";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    const videos = await Video.find({}).sort({ createdAt: -1 }).lean();

    if (!videos || videos.length === 0) {
      return NextResponse.json({ success: true, videos: [] });
    }

    return NextResponse.json({ success: true, videos });
  } catch (error) {
    console.error("Feed fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch videos" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectToDatabase();

    const body: IVideo = await request.json();
    if (
      !body.title ||
      !body.description ||
      !body.videoUrl ||
      !body.thumbnailUrl
    ) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const videoData = {
      ...body,
      userId: session.user.id,
      createdAt: new Date(),
      controls: body?.controls ?? true,
      transformation: {
        height: 1920,
        width: 1080,
        quality: body.transformation?.quality ?? 100,
      },
    };
    const newVideo = await Video.create(videoData);
    return NextResponse.json(newVideo);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create video" },
      { status: 500 }
    );
  }
}
