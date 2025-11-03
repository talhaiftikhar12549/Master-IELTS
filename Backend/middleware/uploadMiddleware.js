import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "uploads/others"; 

    if (file.mimetype.startsWith("video")) {
      folder = "uploads/videos";
    } else if (file.mimetype.startsWith("image")) {
      folder = "uploads/images";
    } else if (file.mimetype === "application/pdf") {
      folder = "uploads/pdfs";
    }

    // Ensure folder exists
    fs.mkdirSync(folder, { recursive: true });
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, filename);
  },
});

// File filter (optional, you can expand this)
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "video/mp4",
    "video/mkv",
    "video/mov",
    "video/avi",
    "video/webm",
    "application/pdf",
  ];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, true);
  }
};

// File size limit (e.g., 100MB)
const limits = { fileSize: 100 * 1024 * 1024 };

const upload = multer({ storage, fileFilter, limits });

export default upload;