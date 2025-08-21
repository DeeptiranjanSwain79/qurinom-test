import multer from "multer";
import path from "path";
const storage = multer.memoryStorage();

const fileFilter = (req: any, file: any, cb: any) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const allowed = [
        ".jpg",
        ".jpeg",
        ".png",
        ".gif",
        ".webp",
        ".mp4",
        ".avi",
        ".mov",
        ".webm",
        ".pdf",
        ".docx",
        ".txt",
    ];

    if (allowed.includes(ext)) {
        cb(null, true);
    } else {
        cb(new Error("Unsupported file type"), false);
    }
};

const upload = multer({ storage, fileFilter });

export default upload;