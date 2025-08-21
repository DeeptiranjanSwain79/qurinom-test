import mongoose, { Schema, Document, Model } from "mongoose";
export enum CategoryEnum {
    FASHION = "FASHION",
    ELECTRONICS = "ELECTRONICS",
    HOME = "HOME",
    BEAUTY = "BEAUTY",
    BOOKS = "BOOKS",
    SPORTS = "SPORTS",
    TOYS = "TOYS",
    AUTOMOTIVE = "AUTOMOTIVE",
    OTHER = "OTHER",
}

export enum SubCategoryEnum {
    // Fashion
    MENS_CLOTHING = "MENS_CLOTHING",
    WOMENS_CLOTHING = "WOMENS_CLOTHING",
    FOOTWEAR = "FOOTWEAR",
    ACCESSORIES = "ACCESSORIES",

    // Electronics
    MOBILES = "MOBILES",
    LAPTOPS = "LAPTOPS",
    CAMERAS = "CAMERAS",
    AUDIO = "AUDIO",

    // Home
    FURNITURE = "FURNITURE",
    KITCHEN = "KITCHEN",
    DECOR = "DECOR",

    // Beauty
    SKINCARE = "SKINCARE",
    HAIRCARE = "HAIRCARE",
    MAKEUP = "MAKEUP",

    // Books
    FICTION = "FICTION",
    NONFICTION = "NONFICTION",
    EDUCATIONAL = "EDUCATIONAL",

    // Sports
    FITNESS = "FITNESS",
    OUTDOOR = "OUTDOOR",
    INDOOR = "INDOOR",

    // Toys
    KIDS = "KIDS",
    PUZZLES = "PUZZLES",
    GAMES = "GAMES",

    // Automotive
    CAR_ACCESSORIES = "CAR_ACCESSORIES",
    BIKE_ACCESSORIES = "BIKE_ACCESSORIES",

    OTHER = "OTHER",
}

export interface IProduct extends Document {
    title: string;
    description: string;
    category: CategoryEnum;
    subcategory?: SubCategoryEnum;
    location?: string;
    tags?: string[];
    images: string[];
    mainImage?: string;
    price: number;
    beforeDiscount?: number;
    material?: string;
    dimensions?: string;
    stock?: number;
    isFeatured?: boolean;
    isAvailable?: boolean;
    createdBy: mongoose.Schema.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

const productSchema: Schema<IProduct> = new Schema(
    {
        title: {
            type: String,
            required: [true, "Please provide the product title"],
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Please provide a product description"],
        },
        category: {
            type: String,
            enum: Object.values(CategoryEnum),
            required: true,
        },
        tags: [String],
        mainImage: {
            type: String,
            required: [true, "Please provide the main product image"],
        },
        images: {
            type: [String],
            required: [true, "Please provide product images"],
        },
        beforeDiscount: Number,
        price: {
            type: Number,
            required: [true, "Please provide the product price"],
        },
        material: String,
        dimensions: String,
        stock: {
            type: Number,
            default: 0,
        },
        isFeatured: {
            type: Boolean,
            default: false,
        },
        isAvailable: {
            type: Boolean,
            default: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        subcategory: {
            type: String,
            enum: Object.values(SubCategoryEnum),
            required: true,
            default: SubCategoryEnum.OTHER,
        },
        location: { type: String },
    },
    { timestamps: true }
);

const ProductModel: Model<IProduct> = mongoose.model<IProduct>(
    "Product",
    productSchema
);

export default ProductModel;
