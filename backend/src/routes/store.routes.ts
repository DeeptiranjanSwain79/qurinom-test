import { Router } from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { createProduct, deleteProduct, getProductDetails, getProducts, getProductsMerchant, updateProduct } from "../controllers/store.controller";
import upload from "../utils/multer";

const storeRouter = Router();

storeRouter.route("/create")
    .post(
        isAuthenticated,
        authorizeRoles("MERCHANT", "ADMIN"),
        upload.fields([
            { name: "mainImage", maxCount: 1 },
            { name: "images", maxCount: 50 }
        ]),
        createProduct
    );

storeRouter.route("/").get(getProducts);
storeRouter.route("/admin").get(isAuthenticated, authorizeRoles("MERCHANT", "ADMIN"), getProductsMerchant);

storeRouter.route("/:productId")
    .get(getProductDetails)
    .delete(isAuthenticated, authorizeRoles("MERCHANT", "ADMIN"), deleteProduct)
    .post(
        isAuthenticated,
        authorizeRoles("MERCHANT", "ADMIN"),
        upload.fields([
            { name: "mainImage", maxCount: 1 },
            { name: "images", maxCount: 50 }
        ]),
        updateProduct
    );


export default storeRouter;