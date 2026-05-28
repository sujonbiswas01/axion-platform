import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

import { logger } from "../lib/pino";
import { cloudinaryUpload } from "./cloudinary.congig";

const VIDEO_EXTENSIONS = ["mp4", "mov", "avi", "webm", "mkv"];
const IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "webp", "gif"];

const storage = new CloudinaryStorage({
  cloudinary: cloudinaryUpload,

  params: async (req, file) => {
    const originalName = file.originalname;
    const extension = originalName.split(".").pop()?.toLowerCase();

    logger.debug(
      { fileName: file.originalname, mimeType: file.mimetype },
      "Preparing upload file metadata"
    );

    const fileNameWithoutExtension = originalName
      .split(".")
      .slice(0, -1)
      .join(".")
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "");

    const uniqueName =
      Math.random().toString(36).substring(2) +
      "-" +
      Date.now() +
      "-" +
      fileNameWithoutExtension;

    const isPdf = extension === "pdf";
    const isVideo = VIDEO_EXTENSIONS.includes(extension || "");
    const isImage = IMAGE_EXTENSIONS.includes(extension || "");

    const folder = isPdf
      ? "pdfs"
      : isVideo
      ? "videos"
      : "images";

    return {
      folder: `lumen/${folder}`,
      public_id: uniqueName,
      chunk_size: 6000000,

      resource_type: isPdf ? "raw" : isVideo ? "video" : "image",

      format: isPdf || isVideo ? undefined : "webp",

      transformation: isImage
        ? [{ quality: "auto", fetch_format: "auto" }]
        : undefined,
    };
  },
});

export const multerUpload = multer({
  storage,
  limits: {
    fileSize: 1 * 1024 * 1024 * 1024, // 1GB
    files: 6,
  },
});