import { getUploadAuthParams } from "@imagekit/next/server";

try {
  export async function GET() {
    const authenticationParameters = getUploadAuthParams({
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
      publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY as string,
    });

    return Response.json({
      authenticationParameters,
      publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY,
    });
  }
} catch (error) {
  return Response.json(
    {
      error: "Authentication for ImageKit failed",
    },
    { status: 500 }
  );
}
