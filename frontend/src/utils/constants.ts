export const API_VERSION: string = "v1";

export const TOKEN_KEY: string = "AUTH_TOKEN";

// export const BASE_URL: string = `http://localhost:5000/api/${API_VERSION}`;
export const BASE_URL: string = `https://qurinom-test.vercel.app/api/${API_VERSION}`;

export const SECRET_KEY: string = "$2y$12$7YhjQDHInvx7tXFdswJIbOaOeRGeqM9f9YzReT7QRYhdtPUpOrOM2";

export const USER_KEY: string = "xoxo";

export const ProductCategoryArray = [
    "FASHION",
    "ELECTRONICS",
    "HOME",
    "BEAUTY",
    "BOOKS",
    "SPORTS",
    "TOYS",
    "AUTOMOTIVE",
    "OTHER",
] as const;

export const SubCategoryArray = [
    "OTHER",
    // Fashion
    "MENS_CLOTHING",
    "WOMENS_CLOTHING",
    "FOOTWEAR",
    "ACCESSORIES",

    // Electronics
    "MOBILES",
    "LAPTOPS",
    "CAMERAS",
    "AUDIO",

    // Home
    "FURNITURE",
    "KITCHEN",
    "DECOR",

    // Beauty
    "SKINCARE",
    "HAIRCARE",
    "MAKEUP",

    // Books
    "FICTION",
    "NONFICTION",
    "EDUCATIONAL",

    // Sports
    "FITNESS",
    "OUTDOOR",
    "INDOOR",

    // Toys
    "KIDS",
    "PUZZLES",
    "GAMES",

    // Automotive
    "CAR_ACCESSORIES",
    "BIKE_ACCESSORIES",
] as const;