"use client";

import { useState } from "react";
import FileUpload from "./FileUpload";

interface VideoUploadProps {
  onSuccess?: (videoData: { videoUrl: string; thumbnailUrl: string }) => void;
}

export default function VideoUpload({ onSuccess }: VideoUploadProps) {
  const [step, setStep] = useState<"video" | "thumbnail">("video");
  const [videoData, setVideoData] = useState<{
    videoUrl: string;
    thumbnailUrl: string;
  }>({
    videoUrl: "",
    thumbnailUrl: "",
  });
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleVideoUpload = (res: any) => {
    setVideoData((prev) => ({ ...prev, videoUrl: res.url }));
    setStep("thumbnail");
  };

  const handleThumbnailUpload = (res: any) => {
    const newVideoData = { ...videoData, thumbnailUrl: res.url };
    setVideoData(newVideoData);
    onSuccess?.(newVideoData);
  };

  return (
    <div className="space-y-4">
      {step === "video" ? (
        <div>
          <h3 className="text-lg font-semibold mb-2 dark:text-white">
            Upload Video
          </h3>
          <FileUpload
            fileType="video"
            onSuccess={handleVideoUpload}
            onProgress={setUploadProgress}
          />
        </div>
      ) : (
        <div>
          <h3 className="text-lg font-semibold mb-2 dark:text-white">
            Upload Thumbnail
          </h3>
          <FileUpload
            fileType="image"
            onSuccess={handleThumbnailUpload}
            onProgress={setUploadProgress}
          />
        </div>
      )}
    </div>
  );
}
