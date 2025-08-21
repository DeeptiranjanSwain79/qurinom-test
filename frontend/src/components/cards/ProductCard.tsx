import { FavoriteBorder } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { useContext } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import AuthContext, { type AuthContextType } from "../../contexts/Auth.context";
import type { Product } from "../../utils/interfaces";
import { grayText, red, yellow1 } from "../../utils/themes";

const ProductCard = ({
  products,
  isAdmin,
}: {
  products: Product[];
  isAdmin: boolean;
}) => {
  const { user } = useContext(AuthContext) as AuthContextType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addToWishlistHandler = async (e: any) => {
    e.preventDefault();
    toast.success("Added to wishlist");
  };
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          md: "1fr 1fr 1fr 1fr",
          sm: "1fr 1fr",
          xs: "1fr",
        },
        gap: 3,
      }}
    >
      {products.map((product) => {
        const discount =
          product.beforeDiscount && product.price
            ? Math.round(
                ((product.beforeDiscount - product.price) /
                  product.beforeDiscount) *
                  100
              )
            : 0;

        return (
          <Box
            key={product._id}
            component={Link}
            to={
              isAdmin
                ? `/store-management/${product._id}`
                : `/store/${product._id}`
            }
            sx={{
              textDecoration: "none",
              border: "1px solid #e0e0e0",
              borderRadius: 2,
              overflow: "hidden",
              position: "relative",
              bgcolor: "#fff",
              "&:hover": { boxShadow: 3 },
            }}
          >
            {/* Wishlist */}
            {user && !isAdmin && (
              <IconButton
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  bgcolor: "#fff",
                }}
                size="small"
                onClick={(e) => addToWishlistHandler(e)}
              >
                <FavoriteBorder />
              </IconButton>
            )}

            {/* Image */}
            <Box
              component="img"
              src={
                product.mainImage ||
                "https://via.placeholder.com/300x180.png?text=Product"
              }
              alt={product.title}
              sx={{
                width: "100%",
                height: 200,
                objectFit: "contain",
                bgcolor: "#fafafa",
              }}
            />

            {/* Content */}
            <Box sx={{ p: 2 }}>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                noWrap
                color={red}
              >
                {product.title}
              </Typography>

              {/* Price */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mt: 1,
                }}
              >
                <Typography variant="h6" color={yellow1} fontWeight="bold">
                  £{product.price?.toFixed(2)}
                </Typography>
                {product.beforeDiscount && (
                  <Typography
                    variant="body2"
                    sx={{
                      textDecoration: "line-through",
                      color: grayText,
                    }}
                  >
                    £{product.beforeDiscount?.toFixed(2)}
                  </Typography>
                )}
                {discount > 0 && (
                  <Typography variant="body1" color={red}>
                    {discount} % off
                  </Typography>
                )}
              </Box>

              {/* Availability */}
              <Typography
                variant="body2"
                sx={{
                  color: product.stock <= 1 ? "red" : "orange",
                  mt: 1,
                }}
              >
                {product.stock <= 1
                  ? "Only 1 left"
                  : product.stock < 5
                  ? "Only few left"
                  : ""}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default ProductCard;
