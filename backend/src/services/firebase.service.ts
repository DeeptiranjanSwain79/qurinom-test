import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../utils/firebase";


export const uploadToFirebase = async (userId: string, uploads: Express.Multer.File[], type: string = "images") => {
    const pathInitials = `QURINOM/${userId}/${type}`;
    const uploadUrls: { url: string, fileName: string }[] = [];
    for (const file of uploads) {
        const filePath = `${pathInitials}/${file.originalname}`;
        const storageRef = ref(storage, filePath);
        const metaData = {
            contentType: file.mimetype,
        }

        await uploadBytes(storageRef, file.buffer, metaData);

        uploadUrls.push({ url: await getDownloadURL(storageRef), fileName: file.originalname });
    }

    return uploadUrls;
}

export const deleteFromFirebase = async (fileUrl: string) => {
    try {
        const uploadRef = ref(storage, fileUrl);
        await deleteObject(uploadRef);
    } catch (error) {
        console.error("Error deleting file from Firebase:", error);
    }
}