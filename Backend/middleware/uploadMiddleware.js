import multer from "multer";
import path from "path";
import fs from "fs";

// Create storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "uploads/others"; // default

    // Sort by mimetype into specific folders
    if (file.mimetype.startsWith("video")) folder = "uploads/videos";
    else if (file.mimetype.startsWith("image")) folder = "uploads/images";
    else if (file.mimetype === "application/pdf") folder = "uploads/pdfs";
    else if (
      file.mimetype === "application/msword" ||
      file.mimetype.includes("officedocument.wordprocessingml")
    ) folder = "uploads/docs";
    else if (file.mimetype.includes("presentation"))
      folder = "uploads/ppts";

    // Ensure folder exists
    fs.mkdirSync(folder, { recursive: true });

    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
    cb(null, filename);
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "video/mp4",
    "video/mkv",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type."), false);
  }
};

// File size limit (100MB for videos, 5MB for images/docs)
const limits = { fileSize: 100 * 1024 * 1024 };

const upload = multer({ storage, fileFilter, limits });

export default upload;