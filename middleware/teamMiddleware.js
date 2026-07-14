import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// Cloudinary storage directly inside multer setup
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "images", // folder in Cloudinary
        allowed_formats: ["jpg", "jpeg", "png"],
    },
});

// file filter (same as yours)
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;

    const extOk = allowedTypes.test(file.originalname.toLowerCase());
    const mimeOk = allowedTypes.test(file.mimetype);

    if (extOk && mimeOk) {
        cb(null, true);
    } else {
        cb(null, false); //  reject file safely
        req.fileValidationError = "Only JPG, JPEG, PNG files are allowed.";
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 2 * 1024 * 1024,
    },
});

export default upload;