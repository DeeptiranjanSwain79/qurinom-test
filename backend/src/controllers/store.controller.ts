import { NextFunction, Response } from "express";
import { catchAsyncError } from "../middleware/cathcAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import ProductModel from "../models/product.model";
import { deleteFromFirebase, uploadToFirebase } from "../services/firebase.service";
import { encryptResponse } from "../utils/encryptResponse";
import { userRoleEnum } from "../models/user.model";

export const createProduct = catchAsyncError(
    async (req: any, res: Response, next: NextFunction) => {
        try {
            const userId = req.user._id;

            const { data: rawData } = req.body;
            const data = JSON.parse(rawData);

            // Upload mainImage
            let mainImageUrl = "";
            if (req.files?.mainImage && req.files.mainImage[0]) {
                const uploaded = await uploadToFirebase(
                    "products",
                    req.files.mainImage,
                    `${userId}/main`
                );
                if (uploaded && uploaded.length > 0) {
                    mainImageUrl = uploaded[0]?.url as string;
                }
            }

            // Upload other images
            let otherImageUrls: string[] = [];
            if (req.files?.images && req.files.images.length > 0) {
                const uploadedImages = await uploadToFirebase(
                    "products",
                    req.files.images,
                    `${userId}/gallery`
                );
                otherImageUrls = uploadedImages.map((u) => u.url);
            }

            const product = await ProductModel.create({
                ...data,
                mainImage: mainImageUrl,
                images: otherImageUrls,
                createdBy: userId,
            });

            res.status(201).json({
                success: true,
                product: encryptResponse(product),
            });
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 500));
        }
    }
);

export const updateProduct = catchAsyncError(
    async (req: any, res: Response, next: NextFunction) => {
        try {
            const { productId } = req.params;
            const { data: rawData } = req.body;
            const data = JSON.parse(rawData);
            const userId = req.user._id;

            const product = await ProductModel.findById(productId);
            if (!product) {
                return next(new ErrorHandler("Product not found", 404));
            }

            // --- Main Image ---
            if (req.files?.mainImage && req.files.mainImage[0]) {
                // delete old
                if (product.mainImage) {
                    await deleteFromFirebase(product.mainImage);
                }
                const uploadedMain = await uploadToFirebase(
                    "products",
                    req.files.mainImage,
                    `${userId}/main`
                );
                if (uploadedMain && uploadedMain.length > 0) {
                    product.mainImage = uploadedMain[0]?.url as string;
                }
            }

            // --- Gallery Images ---
            if (req.files?.images && req.files.images.length > 0) {
                // New uploads
                const uploadedImages = await uploadToFirebase(
                    "products",
                    req.files.images,
                    `${userId}/gallery`
                );
                const newUrls = uploadedImages.map((u) => u.url);

                // Deleted ones: images not in frontend’s new list
                if (data.existingImages) {
                    const removed = product.images.filter(
                        (img: string) => !data.existingImages.includes(img)
                    );
                    for (const img of removed) {
                        await deleteFromFirebase(img);
                    }
                    product.images = [...data.existingImages, ...newUrls];
                } else {
                    // overwrite fully if no "existingImages" sent
                    for (const old of product.images) {
                        await deleteFromFirebase(old);
                    }
                    product.images = newUrls;
                }
            } else if (data.existingImages) {
                // Handle case where only some images removed
                const removed = product.images.filter(
                    (img: string) => !data.existingImages.includes(img)
                );
                for (const img of removed) {
                    await deleteFromFirebase(img);
                }
                product.images = data.existingImages;
            }

            // --- Update other fields ---
            product.title = data.title ?? product.title;
            product.description = data.description ?? product.description;
            product.category = data.category ?? product.category;
            product.price = data.price ?? product.price;
            product.beforeDiscount =
                data.beforeDiscount ?? product.beforeDiscount;
            product.material = data.material ?? product.material;
            product.dimensions = data.dimensions ?? product.dimensions;
            product.stock = data.stock ?? product.stock;
            product.isFeatured = data.isFeatured ?? product.isFeatured;
            product.isAvailable = data.isAvailable ?? product.isAvailable;

            await product.save();

            const updatedProduct = await ProductModel.findById(product._id);

            res.status(200).json({
                success: true,
                product: encryptResponse(updatedProduct),
            });
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 500));
        }
    }
);
export const getProducts = catchAsyncError(
    async (req: any, res: Response, next: NextFunction) => {
        try {
            // Pagination
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const skip = (page - 1) * limit;

            // Filters
            const {
                search,
                category,
                subcategory,
                minPrice,
                maxPrice,
                isAvailable,
                isFeatured,
                location,
                sortBy, // NEW: price, rating, createdAt, etc.
            } = req.query;

            const filter: Record<string, unknown> = {};

            if (search) {
                filter.title = { $regex: search, $options: "i" };
            }
            if (category) filter.category = category;
            if (subcategory) filter.subcategory = subcategory;
            if (location) filter.location = { $regex: location, $options: "i" };
            if (minPrice || maxPrice) {
                filter.price = {};
                if (minPrice) (filter.price as any).$gte = Number(minPrice);
                if (maxPrice) (filter.price as any).$lte = Number(maxPrice);
            }
            if (isAvailable) filter.isAvailable = isAvailable === "true";
            if (isFeatured) filter.isFeatured = isFeatured === "true";

            // Sorting
            // let sort: Record<string, 1 | -1> = { createdAt: -1 }; // default newest first
            let sort: Record<string, 1 | -1> = { price: 1 };
            if (sortBy) {
                const order = sortBy === "priceLowHigh" ? 1 : -1;
                sort = { price: order };
            }

            const totalProducts = await ProductModel.countDocuments(filter);

            const products = await ProductModel.find(filter)
                .sort(sort)
                .skip(skip)
                .limit(limit);

            res.status(200).json({
                success: true,
                page,
                totalPages: Math.ceil(totalProducts / limit),
                totalProducts,
                products: encryptResponse(products),
            });
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 500));
        }
    }
);


export const deleteProduct = catchAsyncError(async (req: any, res: Response, next: NextFunction) => {
    try {
        const { productId } = req.params;

        const isBookExists = await ProductModel.findById(productId);
        if (!isBookExists) {
            return next(new ErrorHandler("Book not found", 404));
        }
        if (isBookExists.createdBy.toString() !== req.user._id.toString() || req.user.role !== userRoleEnum.ADMIN) {
            return next(new ErrorHandler("You are not authorized to update this book", 401));
        }
        // delete book object
        await ProductModel.findByIdAndDelete(isBookExists._id);

        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
        });
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});

export const getProductDetails = catchAsyncError(async (req: any, res: Response, next: NextFunction) => {
    try {
        const { productId } = req.params;
        const product = await ProductModel.findById(productId);
        if (!product) {
            return next(new ErrorHandler("Product not found", 404));
        }
        res.status(200).json({
            success: true,
            product: encryptResponse(product),
        });
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
})